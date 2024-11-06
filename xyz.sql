-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 20, 2024 at 10:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xyz`
--

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `ccode` varchar(10) NOT NULL,
  `cname` varchar(60) NOT NULL,
  `cdetails` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`ccode`, `cname`, `cdetails`) VALUES
('CSE220', 'Data Structures', 'Introduction to widely used and effective methods of data organisation, focussing on data structures, their algorithms and the performance of these algorithms.'),
('CSE221', 'Algorithms', 'The study of efficient algorithms and effective algorithm design techniques.'),
('CSE331', 'Automata', 'THIS IS A COURSE.');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `name` varchar(30) NOT NULL,
  `sid` int(8) NOT NULL,
  `department` text NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(100) NOT NULL,
  `phone` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`name`, `sid`, `department`, `email`, `password`, `phone`) VALUES
('ahmad shakib', 12345678, 'CSE', 'ahmadshakib770@gmail.com', '$2a$10$3gzIMdgbEYdikrtERaGahe4zwIZwJfDHiGPkplKpW2HPXy7yHVZXa', '47849714111'),
('Ahanaf Tanvir', 21301331, 'CSE', 'ahanaf.tanvir4@gmail.com', '$2a$10$ktPJIqpI2U.r4j1kG2VEluykTH0XmPTTblQfv808FjFmaZxdl5W9q', '01603013192'),
('sakib', 21301332, 'CSE', 'tenz@gmail.com', '$2a$10$7f7..sl7E3KAu1rvP2JehOsfQMnwbM3K5Xde9c.IddgiEB4.VrYpi', '01603013192'),
('test', 21301334, 'CSE', 'test@gmail.com', '$2a$10$gp96jGJFcCu28lepqT.NdemmnO1suf5Dzl1QHpA.TVEiQ869oqf0u', '01603013192'),
('Nazib Hasan', 22101130, 'CSE', 'nazib.hasan@g.bracu.ac.bd', '$2a$10$UNUlIyVNklW4mUV9L381.e731fBwdvD8onk/TJXA55jUlaXI8FzBG', '22222222222');

-- --------------------------------------------------------

--
-- Table structure for table `student_take_course`
--

CREATE TABLE `student_take_course` (
  `id` int(100) NOT NULL,
  `sid` int(8) NOT NULL,
  `ccode` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student_take_course`
--

INSERT INTO `student_take_course` (`id`, `sid`, `ccode`) VALUES
(5, 22101130, 'CSE331');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`ccode`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `student_take_course`
--
ALTER TABLE `student_take_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sid` (`sid`),
  ADD KEY `ccode` (`ccode`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `student_take_course`
--
ALTER TABLE `student_take_course`
  MODIFY `id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `student_take_course`
--
ALTER TABLE `student_take_course`
  ADD CONSTRAINT `student_take_course_ibfk_1` FOREIGN KEY (`sid`) REFERENCES `student` (`sid`),
  ADD CONSTRAINT `student_take_course_ibfk_2` FOREIGN KEY (`ccode`) REFERENCES `course` (`ccode`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
