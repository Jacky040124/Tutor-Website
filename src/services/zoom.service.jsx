import { withRetry } from "@/utils/retry";
import { useState } from 'react';

export class ZoomService {
  static tokenCache = {
    token: null,
    expiresAt: null,
  };

  static async getAccessToken() {
    // Check cache first
    if (this.isTokenValid()) {
      return this.tokenCache.token;
    }

    try {
      const credentials = Buffer.from(
        `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`
      ).toString("base64");

      const response = await fetch(
        `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${process.env.ZOOM_ACCOUNT_ID}`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${credentials}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get access token");
      }

      const { access_token, expires_in } = await response.json();

      // Cache the token
      this.tokenCache = {
        token: access_token,
        expiresAt: Date.now() + expires_in * 1000 - 300000, // Subtract 5 minutes for safety
      };

      return access_token;
    } catch (error) {
      console.error("Error getting Zoom access token:", error);
      throw error;
    }
  }

  static isTokenValid() {
    return (
      this.tokenCache.token &&
      this.tokenCache.expiresAt &&
      Date.now() < this.tokenCache.expiresAt
    );
  }

  static async createMeeting(bookingDetails) {
    try {
      const response = await fetch("/api/zoom", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_time: new Date(
            bookingDetails.date.year,
            bookingDetails.date.month - 1,
            bookingDetails.date.day,
            bookingDetails.startTime
          ).toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create meeting");
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create meeting:", error);
      throw error;
    }
  }

  static async deleteMeeting(meetingId) {
    return withRetry(async () => {
      const token = await this.getAccessToken();

      const response = await fetch(
        `https://api.zoom.us/v2/meetings/${meetingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok && response.status !== 404) {
        const error = new Error(
          `Failed to delete meeting: ${response.statusText}`
        );
        error.status = response.status;
        throw error;
      }
    });
  }
}
