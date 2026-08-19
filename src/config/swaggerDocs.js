/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Test Customer
 *               email:
 *                 type: string
 *                 example: test@repaircheck.com
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test@123456
 *               role:
 *                 type: string
 *                 enum:
 *                   - customer
 *                   - technician
 *                 example: customer
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Required fields are missing
 *       409:
 *         description: Email or phone already exists
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@repaircheck.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Test@123456
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/profile:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Update user profile and profile image
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Abhishek Singh
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               address:
 *                 type: string
 *                 example: Lucknow, Uttar Pradesh
 *               latitude:
 *                 type: number
 *                 example: 26.8467
 *               longitude:
 *                 type: number
 *                 example: 80.9462
 *               profileImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/auth/change-password:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Change current password
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 example: Test@123456
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: NewTest@123456
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: NewTest@123456
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid password data
 *       401:
 *         description: Current password is incorrect
 */

/**
 * @swagger
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create password reset request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@repaircheck.com
 *     responses:
 *       200:
 *         description: Password reset request created
 *       400:
 *         description: Email is required
 */

/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset password using reset token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resetToken
 *               - newPassword
 *               - confirmPassword
 *             properties:
 *               resetToken:
 *                 type: string
 *                 example: 9f4a7b8c...
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: ResetTest@123456
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 example: ResetTest@123456
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired reset token
 */

/**
 * @swagger
 * /api/repair-requests:
 *   post:
 *     tags:
 *       - Repair Requests
 *     summary: Create a repair request
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - address
 *               - latitude
 *               - longitude
 *             properties:
 *               title:
 *                 type: string
 *                 example: AC is not cooling
 *               description:
 *                 type: string
 *                 example: AC is running but not cooling properly.
 *               category:
 *                 type: string
 *                 example: AC Repair
 *               address:
 *                 type: string
 *                 example: Lucknow, Uttar Pradesh
 *               latitude:
 *                 type: number
 *                 example: 26.8467
 *               longitude:
 *                 type: number
 *                 example: 80.9462
 *               preferredDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-22
 *               preferredTime:
 *                 type: string
 *                 example: 11:00 AM
 *     responses:
 *       201:
 *         description: Repair request created successfully
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized
 *
 *   get:
 *     tags:
 *       - Repair Requests
 *     summary: Get my repair requests
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Repair requests fetched successfully
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/repair-requests/{id}:
 *   get:
 *     tags:
 *       - Repair Requests
 *     summary: Get repair request details
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     responses:
 *       200:
 *         description: Repair request fetched successfully
 *       404:
 *         description: Repair request not found
 *
 *   put:
 *     tags:
 *       - Repair Requests
 *     summary: Update repair request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: AC cooling problem updated
 *               description:
 *                 type: string
 *                 example: AC is making unusual noise.
 *               category:
 *                 type: string
 *                 example: AC Repair
 *               address:
 *                 type: string
 *                 example: Lucknow, Uttar Pradesh
 *               latitude:
 *                 type: number
 *                 example: 26.8467
 *               longitude:
 *                 type: number
 *                 example: 80.9462
 *               preferredDate:
 *                 type: string
 *                 format: date
 *                 example: 2026-08-24
 *               preferredTime:
 *                 type: string
 *                 example: 2:00 PM
 *     responses:
 *       200:
 *         description: Repair request updated successfully
 *       400:
 *         description: Request cannot be updated
 *       404:
 *         description: Repair request not found
 *
 *   delete:
 *     tags:
 *       - Repair Requests
 *     summary: Delete repair request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     responses:
 *       200:
 *         description: Repair request deleted successfully
 *       400:
 *         description: Request cannot be deleted
 *       404:
 *         description: Repair request not found
 */

/**
 * @swagger
 * /api/repair-requests/{id}/cancel:
 *   put:
 *     tags:
 *       - Repair Requests
 *     summary: Cancel repair request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: I no longer need the repair service
 *     responses:
 *       200:
 *         description: Repair request cancelled successfully
 *       400:
 *         description: Request cannot be cancelled
 *       404:
 *         description: Repair request not found
 */

/**
 * @swagger
 * /api/technicians/nearby-requests:
 *   get:
 *     tags:
 *       - Technician
 *     summary: Get nearby pending repair requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: latitude
 *         required: true
 *         schema:
 *           type: number
 *         example: 26.8467
 *       - in: query
 *         name: longitude
 *         required: true
 *         schema:
 *           type: number
 *         example: 80.9462
 *       - in: query
 *         name: radius
 *         required: false
 *         schema:
 *           type: number
 *           default: 20
 *         description: Radius in kilometers
 *       - in: query
 *         name: category
 *         required: false
 *         schema:
 *           type: string
 *         example: AC Repair
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Nearby repair requests fetched successfully
 *       400:
 *         description: Invalid location
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Technician access required
 */

/**
 * @swagger
 * /api/technicians/requests/{id}:
 *   get:
 *     tags:
 *       - Technician
 *     summary: Get repair request details for technician
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     responses:
 *       200:
 *         description: Repair request details fetched successfully
 *       404:
 *         description: Repair request not found
 *       403:
 *         description: Technician access required
 */

/**
 * @swagger
 * /api/technicians/requests/{id}/accept:
 *   put:
 *     tags:
 *       - Technician
 *     summary: Accept a repair request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     responses:
 *       200:
 *         description: Repair request accepted successfully
 *       404:
 *         description: Request not found or already assigned
 *       403:
 *         description: Technician access required
 */

/**
 * @swagger
 * /api/technicians/requests/{id}/reject:
 *   put:
 *     tags:
 *       - Technician
 *     summary: Reject a repair request
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 68a84095bf691fc411c0ac082
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reason:
 *                 type: string
 *                 example: This repair is outside my expertise
 *     responses:
 *       200:
 *         description: Repair request rejected successfully
 *       404:
 *         description: Request not found
 *       403:
 *         description: Technician access required
 */