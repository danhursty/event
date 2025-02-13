import { Router } from "express";

const healthRouter = Router();

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Check API health status
 *     description: Returns the current health status of the API and server timestamp
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                   description: The health status of the API
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-16T12:00:00.000Z"
 *                   description: The current server timestamp
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Internal Server Error
 *                     code:
 *                       type: string
 *                       example: INTERNAL_SERVER_ERROR
 */
healthRouter.get("/", (_, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

export { healthRouter };
