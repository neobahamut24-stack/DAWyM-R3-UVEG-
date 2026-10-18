CREATE DATABASE IF NOT EXISTS gestor_tareas_r3
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE gestor_tareas_r3;

CREATE TABLE IF NOT EXISTS tareas (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descripcion TEXT NULL,
    completada TINYINT(1) NOT NULL DEFAULT 0,
    fecha_creacion TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_tareas_completada (completada),
    INDEX idx_tareas_fecha_creacion (fecha_creacion)
) ENGINE=InnoDB
  DEFAULT CHARSET=utf8mb4
  COLLATE=utf8mb4_unicode_ci;