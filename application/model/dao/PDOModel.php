<?php namespace DaoPDO;
    use \PDO;
    use PDOException;
    use Exception;

    abstract class PDOModel {
        protected $table;
        protected $pdoModel;

        public function __construct($table) {
            // Set up the database source name (DSN)
            $dsn = 'sqlite:'.DATABASE_PATH;
            $this->table = $table;
            // Then create a connection to a database with the PDO() function
            try {
                // Change connection string for different databases, currently using SQLite
                $this->pdoModel = new PDO($dsn, '', '', [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, //turn on errors in the form of exceptions
                    PDO::ATTR_EMULATE_PREPARES => false, // turn off emulation mode for "real" prepared statements
                ]);
            } catch (PDOEXception $e) {
                // Generate an error message if the connection fails
                // todo: Handle this later by returning error to JS
                throw $e;
            }
        }

        /**
         * @return array
         * @throws PDOException
         */
        public function getAll($classType) {
            return $this->pdoModel->query(
                'SELECT * FROM '.$this->table
            )->fetchAll(PDO::FETCH_CLASS, $classType);
        }

        public function get($id, $classType) {
            return $this->pdoModel->query(
                'SELECT * FROM '.$this->table.' WHERE id ='.$id
            )->fetchAll(PDO::FETCH_CLASS, $classType)[0];
        }

        /**
         * Attempts to insert an object into the stored table. See object below for object formatting
         * @param $dto
         * The object to receive and iterate for values it has to match the object the table is expecting and must
         * have all values not null
         */
        public function insert($dto) {
            // As we do not know if the incoming dto supports all columns in the table
            // We first get all the columns of the table
            $query = $this->pdoModel->query("DESCRIBE ".$this->table);
            $tableFields = $query->fetchAll(PDO::FETCH_COLUMN);

            // Transform table columns into a form SQL insert statement will accept
            $tableFieldsAsSQLString = implode(",", $tableFields);

            // Create an array of all values that intersect with our table
            $dtoTableIntersection = [];

            // Now loop through all the object keys and insert where exists in table
            foreach ($dto as $key=>$value) {
                if (in_array($key, $tableFields) && $key !== 'id') {
                    array_push($dtoTableIntersection, $value);
                }
            }

            // Transform values into a form SQL insert statement will accept
            $dtoValuesAsSqlString = implode(',', $dtoTableIntersection);

            // Insert values via exec query
            $this->pdoModel->exec('INSERT INTO ' .$this->table.' ('.$tableFieldsAsSQLString.')'.
            ' VALUES ('.$dtoValuesAsSqlString.')');
        }
    }