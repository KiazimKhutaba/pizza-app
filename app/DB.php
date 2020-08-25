<?php

namespace PizzaApp;

use Exception;

final class DB
{
    private $dsn;
    private $user;
    private $password;
    private $pdo;
    private static $instance = null;


    private function __construct(string $dsn, string $user, string $password)
    {
        $this->dsn  = $dsn;
        $this->user = $user;
        $this->pass = $password;

        $this->pdo = $this->openPDOConnection($dsn, $user, $password);
    }


    public function openPDOConnection(string $dsn, string $user, string $password)
    {
        $options = [
            \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
            \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            \PDO::ATTR_EMULATE_PREPARES   => false,
        ];

        return new \PDO($dsn, $user, $password, $options);
    }


    private function __clone() {}


    public static function get(string $dsn, $user, $password)
    {
        if( self::$instance !== null ) {
            return self::$instance;
        }

        return new self($dsn, $user, $password);
    }


    public function fetchAll($sql)
    {
        $stmt = $this->pdo->query($sql);

        if( $stmt ) {
            return $stmt->fetchAll();
        }

        return false;
    }


    public function fetch($sql)
    {
        throw new Exception(__METHOD__ . " not implemented!");

        $stmt = $this->pdo->prepare($sql);

        if( $stmt ) {
            return $stmt->fetchColumn();
        }

        return false;
    }

    public function insert($sql)
    {
        return $this->pdo->exec($sql);
    }
}