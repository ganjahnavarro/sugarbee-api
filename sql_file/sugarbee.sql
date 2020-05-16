-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 16, 2020 at 08:25 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sugarbee`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `identifier` int(11) UNSIGNED NOT NULL,
  `customer_name` varchar(80) NOT NULL,
  `contact_number` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL,
  `facebook` varchar(50) NOT NULL,
  `instagram` varchar(50) NOT NULL,
  `created_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `deadline` timestamp NULL DEFAULT NULL,
  `pickup_location` varchar(120) NOT NULL,
  `delivery_method` varchar(30) NOT NULL,
  `delivery_address` varchar(120) NOT NULL,
  `discount` float NOT NULL,
  `payment_status` tinyint(1) NOT NULL,
  `request` varchar(50) NOT NULL,
  `special_offer` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`identifier`, `customer_name`, `contact_number`, `email`, `facebook`, `instagram`, `created_date`, `deadline`, `pickup_location`, `delivery_method`, `delivery_address`, `discount`, `payment_status`, `request`, `special_offer`) VALUES
(1, 'Em Buenaventura', '9663601467', 'em@gmail.com', 'Em Buenaventura', 'embuenaventura', '2020-04-30 16:00:00', '2020-04-15 16:00:00', 'Magallanes', 'Lalamove', '11 Pureza St.', 0, 0, 'note card', 'free cake'),
(2, 'Dexmel Hernandez', '9663601467', 'dex@gmail.com', 'Dexmel Hernandez', 'dhernandez', '2020-03-29 16:00:00', '2020-04-16 16:00:00', 'Magallanes', 'Lalamove', 'Tondo Manila', 0, 0, 'note card', 'free cake'),
(3, 'Dex Mel', '9663601467', 'em@gmail.com', 'Dexmel Hernandez', 'embuenaventura', '2020-03-29 16:00:00', '2020-04-21 16:00:00', 'Magallanes', 'LAla', '3 Tondo Manila', 0, 0, 'note card', 'free cake');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `identifier` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `unit_price` float NOT NULL,
  `quantity` int(11) NOT NULL,
  `order_id` int(11) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`identifier`, `product_id`, `unit_price`, `quantity`, `order_id`) VALUES
(1, 1, 1100, 2, 1),
(2, 2, 800, 3, 1),
(3, 3, 550, 5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `identifier` int(10) UNSIGNED NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`identifier`, `username`, `password`) VALUES
(1, 'admin', 12345);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`identifier`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`identifier`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`identifier`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `identifier` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `identifier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `identifier` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`identifier`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
