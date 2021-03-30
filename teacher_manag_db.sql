-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 30, 2021 at 11:33 AM
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
-- Database: `teacher_manag_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `nationality` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `nationality`, `country_name`, `created_at`, `updated_at`) VALUES
(1, 'Nepalese', 'Nepal', NULL, NULL),
(2, 'Indian', 'India', NULL, NULL),
(3, 'Chinese', 'China', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `faculties`
--

CREATE TABLE `faculties` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1050) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `faculties`
--

INSERT INTO `faculties` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Engineering', NULL, NULL, NULL),
(2, 'Management', NULL, NULL, NULL),
(3, 'Education', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2021_03_29_124837_create_faculties_table', 1),
(5, '2021_03_29_125317_create_sub_faculties_table', 1),
(6, '2021_03_29_165359_create_countries_table', 1),
(7, '2021_03_29_173635_create_teachers_table', 1),
(8, '2021_03_30_061423_create_teacher_sub_faculties_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sub_faculties`
--

CREATE TABLE `sub_faculties` (
  `id` int(10) UNSIGNED NOT NULL,
  `faculty_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(1050) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sub_faculties`
--

INSERT INTO `sub_faculties` (`id`, `faculty_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 1, 'Computer Science', NULL, NULL, NULL),
(2, 1, 'Electrical', NULL, NULL, NULL),
(3, 1, 'Civil', NULL, NULL, NULL),
(4, 2, 'BBA/BMS', NULL, NULL, NULL),
(5, 2, 'BBM', NULL, NULL, NULL),
(6, 2, 'BBA LLB', NULL, NULL, NULL),
(7, 3, 'English', NULL, NULL, NULL),
(8, 3, 'Nepali', NULL, NULL, NULL),
(9, 3, 'Mathematics', NULL, NULL, NULL),
(10, 3, 'Science', NULL, NULL, NULL),
(11, 3, 'Science', 'Health', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gender` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` char(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_id` int(10) UNSIGNED NOT NULL,
  `dob` date DEFAULT NULL,
  `faculty_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `name`, `gender`, `phone`, `email`, `address`, `country_id`, `dob`, `faculty_id`, `created_at`, `updated_at`) VALUES
(1, 'se', 'Male', '9809655620', 'adminemp1@gmail.com', 'rz-123, dawarka, newdelhi', 1, '2021-03-13', 2, '2021-03-30 01:05:27', '2021-03-30 01:05:27'),
(2, 'se', 'Male', '9809655621', 'adminemp2@gmail.com', 'rz-123, dawarka, newdelhi', 1, '2021-03-13', 3, '2021-03-30 01:06:26', '2021-03-30 01:06:26'),
(3, 'Ramraj', 'Male', '9816836473', 'ramraj.kapar@gmail.com', 'nakkhu, Lalitpur', 1, '2013-03-12', 2, '2021-03-30 02:17:19', '2021-03-30 02:17:19'),
(5, 'Manoj', 'Male', '9816836474', 'manoj@gmail.com', 'New Delhi', 2, '2013-03-13', 3, '2021-03-30 02:44:25', '2021-03-30 02:44:25'),
(6, 'Raffsan', 'Female', '9814867344', 'raffsan@yahoo.com', 'Janakpur', 1, '2001-03-06', 1, '2021-03-30 02:48:52', '2021-03-30 02:48:52');

-- --------------------------------------------------------

--
-- Table structure for table `teacher_sub_faculties`
--

CREATE TABLE `teacher_sub_faculties` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `teacher_id` bigint(20) UNSIGNED NOT NULL,
  `sub_faculty_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `teacher_sub_faculties`
--

INSERT INTO `teacher_sub_faculties` (`id`, `teacher_id`, `sub_faculty_id`, `created_at`, `updated_at`) VALUES
(1, 1, 5, '2021-03-30 01:05:27', '2021-03-30 01:05:27'),
(2, 1, 6, '2021-03-30 01:05:27', '2021-03-30 01:05:27'),
(3, 2, 8, '2021-03-30 01:06:26', '2021-03-30 01:06:26'),
(4, 2, 10, '2021-03-30 01:06:27', '2021-03-30 01:06:27'),
(5, 3, 5, '2021-03-30 02:17:20', '2021-03-30 02:17:20'),
(6, 3, 6, '2021-03-30 02:17:20', '2021-03-30 02:17:20'),
(7, 5, 9, '2021-03-30 02:44:25', '2021-03-30 02:44:25'),
(8, 5, 10, '2021-03-30 02:44:25', '2021-03-30 02:44:25'),
(9, 6, 1, '2021-03-30 02:48:52', '2021-03-30 02:48:52'),
(10, 6, 2, '2021-03-30 02:48:53', '2021-03-30 02:48:53');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `faculties`
--
ALTER TABLE `faculties`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`);

--
-- Indexes for table `sub_faculties`
--
ALTER TABLE `sub_faculties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sub_faculties_faculty_id_foreign` (`faculty_id`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teachers_phone_unique` (`phone`),
  ADD UNIQUE KEY `teachers_email_unique` (`email`),
  ADD KEY `teachers_country_id_foreign` (`country_id`),
  ADD KEY `teachers_faculty_id_foreign` (`faculty_id`);

--
-- Indexes for table `teacher_sub_faculties`
--
ALTER TABLE `teacher_sub_faculties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_sub_faculties_teacher_id_foreign` (`teacher_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `faculties`
--
ALTER TABLE `faculties`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sub_faculties`
--
ALTER TABLE `sub_faculties`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `teacher_sub_faculties`
--
ALTER TABLE `teacher_sub_faculties`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sub_faculties`
--
ALTER TABLE `sub_faculties`
  ADD CONSTRAINT `sub_faculties_faculty_id_foreign` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_country_id_foreign` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `teachers_faculty_id_foreign` FOREIGN KEY (`faculty_id`) REFERENCES `faculties` (`id`);

--
-- Constraints for table `teacher_sub_faculties`
--
ALTER TABLE `teacher_sub_faculties`
  ADD CONSTRAINT `teacher_sub_faculties_teacher_id_foreign` FOREIGN KEY (`teacher_id`) REFERENCES `teachers` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
