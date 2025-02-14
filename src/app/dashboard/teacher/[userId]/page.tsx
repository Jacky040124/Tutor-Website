"use client";

import { useUser } from "@/hooks/useUser";
import TeacherCalendar from "@/components/TeacherCalendar";
import TeacherProfileOverlay from "@/components/TeacherProfileOverlay";
import { useOverlay } from "@/hooks/useOverlay";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserCircle, Plus } from "lucide-react";
import AddEventOverlay from "@/components/AddEventOverlay";
import { useBooking } from "@/hooks/useBooking";

interface TeacherDashboardProps {
  params: {
    userId: string;
  };
}

export default function TeacherDashboard({ params }: TeacherDashboardProps) {
  const { user } = useUser();
  const t = useTranslations("Dashboard.Teacher");
  const tCommon = useTranslations("Dashboard.Common");
  const { bookings } = useBooking();
  const { showTeacherProfileOverlay, setShowTeacherProfileOverlay, showAddEventOverlay, setShowAddEventOverlay } =
    useOverlay();

  const currentDate = new Date().toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // TODO: use window.userid to handle this
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">{tCommon("pleaseSignIn")}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Welcome Card */}
      <Card className="rounded-xl shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">{t("welcome")}</CardTitle>
          <p className="text-gray-500">{tCommon("greeting", { name: user?.nickname })}</p>
        </CardHeader>
      </Card>

      {/* Navigation Bar with Date and Controls */}
      <div className="flex items-center justify-between bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-base font-semibold">{currentDate}</span>
        </div>

        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Button
            onClick={() => setShowAddEventOverlay(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            {t("addEvent")}
          </Button>
          <Button
            onClick={() => setShowTeacherProfileOverlay(true)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 transition-all duration-200 hover:scale-105 rounded-lg"
          >
            <UserCircle className="h-4 w-4" />
            {t("profile")}
          </Button>
        </div>
      </div>

      {/* Calendar Section */}
      <TeacherCalendar bookings={bookings} />

      {/* Profile Overlay */}
      {showTeacherProfileOverlay && <TeacherProfileOverlay />}

      {/* Add Event Overlay */}
      {showAddEventOverlay && <AddEventOverlay />}
    </div>
  );
}
