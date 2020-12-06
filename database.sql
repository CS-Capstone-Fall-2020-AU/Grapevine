-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 06, 2020 at 07:56 PM
-- Server version: 8.0.18
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `grapevinedatabase`
--

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `companyName` varchar(255) NOT NULL,
  `numOfRatings` int(255) NOT NULL DEFAULT '0',
  `overallRatingGrade` varchar(10) DEFAULT NULL,
  `imgLogoUrl` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`companyName`, `numOfRatings`, `overallRatingGrade`, `imgLogoUrl`) VALUES
('Aerospace Corporation', 4, 'A', 'https://pbs.twimg.com/profile_images/869581746861256704/_dZB4R9W_400x400.jpg'),
('Apple', 1, 'A', 'https://www.computersciencedegreehub.com/wp-content/uploads/2020/10/Unknown.png'),
('Atlassian', 0, 'undefined', 'https://coursera-university-assets.s3.amazonaws.com/37/474f30d9f311e7927dfdc00d65cd87/Square-logo-for-partner-page.png'),
('AT&T', 0, 'B', 'https://www.computersciencedegreehub.com/wp-content/uploads/2020/10/att-logo-150x150.jpg'),
('Boeing', 0, 'undefined', 'https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/102014/boeinglogo.png?itok=1H1JUfJc'),
('Chevron', 0, 'C', 'https://www.computersciencedegreehub.com/wp-content/uploads/2020/10/hallmark_tcm31-4844.png'),
('General Motors', 0, 'undefined', 'https://www.computersciencedegreehub.com/wp-content/uploads/2020/10/160-1605922_gm-logo-png-general-motors-logo-transparent-png.png-150x150.jpeg'),
('General Electric', 0, 'undefined', 'https://www.computersciencedegreehub.com/wp-content/uploads/2020/10/kisspng-general-electric-logo-nyse-ge-company-conglomerate-5b097e0a8f4ae4.470337981527348746587-300x300.jpg'),
('Microsoft', 2, 'A', 'https://thedesignlove.com/wp-content/uploads/2018/02/Case-Study-The-Microsoft-Logo-Evolution-5.jpg'),
('Freddie Mac', 0, 'A', 'https://mk0tgsus1k7lfdsyy7u.kinstacdn.com/wp-content/uploads/2018/11/Freddie-Mac-900x675.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `flag` int(10) NOT NULL DEFAULT '2',
  `reviewID` int(120) NOT NULL,
  `userID` int(10) NOT NULL,
  `internshipRating` varchar(10) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `companyName` varchar(255) NOT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `agreeVotes` int(50) DEFAULT '0',
  `location` varchar(255) DEFAULT NULL,
  `dateOfReview` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAnonymous` int(10) NOT NULL DEFAULT '1',
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`flag`, `reviewID`, `userID`, `internshipRating`, `role`, `companyName`, `comments`, `agreeVotes`, `location`, `dateOfReview`, `isAnonymous`, `username`) VALUES
(0, 1, 1, 'A', 'Software Engineer', 'Aerospace Corporation\r\n', 'I loved this internship. I got to use a lot of new languages, and I had a lot of work to do, but I learned so much!', 3, 'Chantillly, VA', '2020-11-28 13:12:08', 1, NULL),
(0, 2, 1, 'B', 'Data Sciecnce', 'Aerospace Corporation\r\n', 'There was too much work I think for a virtual internship. I spent long hours working and didn\'t get paid overtime, but I learned a lot, and I think the people were really nice.', 5, 'El Segundo, CA', '2020-11-28 13:13:27', 1, NULL),
(0, 3, 1, 'C-', 'Data Science', 'Apple', 'I did not like this internship. Everyone was stuck up and mean. They didn\'t need interns messing with their work and that was obvious.', 40, 'New York, NY', '2020-11-28 13:19:56', 1, NULL),
(0, 4, 1, 'A-', 'Solutions Engineer', 'Atlassian', 'This is such a cool company with really nice people. I enjoyed the experience and would do it again.', 8, 'San Francisco, CA', '2020-11-28 13:21:08', 1, NULL),
(0, 5, 1, 'D', 'Solutions Engineer', 'Boeing', 'Great company, but there was no leadership on my team, and I was not able to complete my tasks, because I didn\'t know what I was supposed to be doing half the time. I would not do it again.', 2, 'St. Louis, MO', '2020-11-28 13:22:12', 1, NULL),
(0, 6, 1, 'B+', 'Software Engineer', 'Aerospace Corporation\r\n', 'I liked this company. They make really cool stuff for space so you feel like you are apart of something grander. I think I learned a lot and the people were really nice.', 40, 'Chantilly, VA', '2020-11-28 13:23:29', 1, NULL),
(0, 7, 1, 'A', 'Software Engineer', 'Microsoft', 'Obviously a really good company to intern for. Only downside is you don\'t really get to pick what you want to work in, and they assign you to random teams, so it was a lot of work learning all new things.', 11, 'Seattle, WA', '2020-11-28 13:24:38', 1, NULL),
(0, 8, 1, 'C+', 'Cybersecurity', 'General Electric\r\n', 'I did not like this internship. It was really boring; there was not much to do, and I didn\'t learn anything I didn\'t already know.', 1, 'San Francisco, CA', '2020-11-28 13:25:40', 1, NULL),
(0, 9, 1, 'F', 'Software Engineer', 'Chevron', 'Terrible company. The people are rude, and I did not learn anything, unfortunately.', 20, 'Washington, DC', '2020-11-28 13:26:26', 1, NULL),
(0, 10, 1, 'A', 'Data Science', 'Freddie Mac', 'I liked this company and learned so much over the summer. They had me working with a lot of new tech, so I learned a lot, and the people are great.', 29, 'Mclean, VA', '2020-11-28 13:27:22', 1, NULL),
(0, 11, 53, 'C', 'Data Scientist', 'Aerospace Corporation', 'undefined', 0, 'El Segundo, CA', '2020-11-30 16:28:43', 0, 'elisabettag'),
(0, 12, 53, 'A-', 'Solutions Engineer', 'Aerospace Corporation', 'undefined', 0, 'El Segundo, CA', '2020-11-30 16:32:59', 0, 'elisabettag'),
(0, 13, 53, 'A+', 'Technology Consultant', 'Aerospace Corporation', 'I loved this internship, great people, and I learned so much.', 0, 'Chantilly, VA', '2020-11-30 16:38:21', 0, 'elisabettag'),
(0, 14, 53, 'A-', 'Software Engineer', 'Aerospace Corporation', 'I really like this job and I\'m glad I did this past summer while it was virtual.', 1, 'Chantilly, VA', '2020-11-30 17:01:21', 0, 'elisabettag'),
(0, 15, 53, 'A', 'Data Scientist', 'Aerospace Corporation', 'I liked this internship becuase I thouht the people were nice.', 1, 'Chantilly, VA', '2020-11-30 17:04:11', 0, 'elisabettag'),
(0, 16, 53, 'F', 'Computer Networking', 'Aerospace Corporation', 'I HATEEEE this internship, and I really wished I had worked at Facebook, but this is real life, and good things don\'t happen to good people.', 0, 'Chantilly, VA', '2020-11-30 18:18:57', 0, 'elisabettag'),
(1, 17, 55, 'A', 'Software Engineer', 'Boeing', 'I liked the internship becuase the people were nice and they gave me food.', 1, 'St. Louis, MO', '2020-11-30 23:03:21', 0, 'cettinag'),
(0, 18, 53, 'B-', 'Cybersecurity', 'Aerospace Corporation', 'I thought it was good overall', 0, 'El Segundo, CA', '2020-12-03 13:33:14', 0, 'elisabettag'),
(1, 19, 53, 'B', 'Technology Consultant', 'Aerospace Corporation', 'I was on the computer the whole time for sure.', 0, 'El Segundo, CA', '2020-12-03 13:35:42', 0, 'elisabettag'),
(0, 20, 53, 'D', 'Cybersecurity', 'Aerospace Corporation', 'I really like this company', 0, 'St. Louis, MO', '2020-12-03 13:36:30', 0, 'elisabettag'),
(1, 21, 53, 'A+', 'Software Engineer', 'Aerospace Corporation', 'That was a great intern experience', 0, 'Chicago, IL', '2020-12-03 13:37:54', 0, 'elisabettag'),
(0, 22, 53, 'A', 'Data Scientist', 'Aerospace Corporation', 'The people were super helpful.', 0, 'Chantilly, VA', '2020-12-03 13:55:12', 0, 'elisabettag'),
(1, 23, 53, 'A', 'Software Engineer', 'Aerospace Corporation', 'This was amazing', 0, 'Chantilly, VA', '2020-12-03 13:59:04', 0, 'elisabettag'),
(0, 24, 53, 'A-', 'Data Scientist', 'Aerospace Corporation', 'This has the most comments ', 0, 'Chantilly, VA', '2020-12-03 14:00:54', 0, 'elisabettag'),
(1, 25, 61, 'A', 'Data Scientist', 'Apple', 'I really liked this and I think it is one of the best, because the people were kind, and I learned a lot from them. Overall, I would do this experience again, and it is best to do it over the summer.', 0, 'San Francisco, CA', '2020-12-03 17:43:26', 1, 'null'),
(0, 26, 65, 'A-', 'UX/UI Design', 'Microsoft', 'I really liked this internship. Microsoft is such a fantastic place to work and I think the people really cared about how much I was learning and improving. If you want to learn something new, then this is the internship for you.', 0, 'Seattle, WA', '2020-12-04 14:18:19', 1, 'null'),
(0, 27, 65, 'A', 'Cybersecurity', 'Microsoft', 'Microsoft is a really great place to work, and I made so many friends. They are working on weird things over there, and I think half the languages they use are wack.', 0, 'San Francisco, CA', '2020-12-04 14:19:29', 1, 'null'),
(1, 28, 67, 'A', 'Data Scientist', 'Aerospace Corporation', 'I thought it was an amazing experience and then some.', 0, 'San Francisco, CA', '2020-12-06 14:52:06', 1, 'null');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(50) NOT NULL,
  `isAnonymous` int(10) NOT NULL,
  `firstName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `isAnonymous`, `firstName`, `lastName`, `username`, `password`, `email`) VALUES
(53, 0, 'undefined', 'undefined', 'elisabettag', 'firstpassword', 'elisabettag80@gmail.com'),
(54, 0, 'undefined', 'undefined', 'cettinag', '1cettina', 'cettinagabriele@msn.com'),
(55, 0, 'undefined', 'undefined', 'cettinag', '1cettina', 'cettinagabriele@msn.com'),
(56, 1, NULL, NULL, NULL, NULL, NULL),
(57, 1, NULL, NULL, NULL, NULL, NULL),
(58, 1, NULL, NULL, NULL, NULL, NULL),
(59, 1, NULL, NULL, NULL, NULL, NULL),
(60, 1, NULL, NULL, NULL, NULL, NULL),
(61, 1, NULL, NULL, NULL, NULL, NULL),
(62, 1, NULL, NULL, NULL, NULL, NULL),
(63, 1, NULL, NULL, NULL, NULL, NULL),
(64, 1, NULL, NULL, NULL, NULL, NULL),
(65, 1, NULL, NULL, NULL, NULL, NULL),
(66, 1, NULL, NULL, NULL, NULL, NULL),
(67, 1, NULL, NULL, NULL, NULL, NULL),
(68, 1, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD UNIQUE KEY `reviewID` (`reviewID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `userID` (`userID`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `reviewID` int(120) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
