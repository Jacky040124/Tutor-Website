"use client";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { useBooking } from "@/hooks/useBooking";
import { getStudentBookings } from "@/services/booking.service";
import StudentCalendar from "@/components/calendar/StudentCalendar";
import StudentProfileOverlay from "@/components/overlays/StudentProfileOverlay";
import { useOverlay } from "@/hooks/useOverlay";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, UserCircle, Code2 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTeachers } from "@/hooks/useTeacher";


export default function StudentDashboard() {
  const { user } = useUser();
  const [selectedTeacher, setSelectedTeacher] = useState<number>(-1);
  const { teachers } = useTeachers();
  const { setFutureBookings, setBookings, showBookingOverlay, bookings, futureBookings } = useBooking();
  const { showStudentProfileOverlay, setShowStudentProfileOverlay } = useOverlay();
  const { t } = useTranslation("dashboard");

  // initialization
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        if (user?.uid) {
          const allBookings = await getStudentBookings(user.uid);
          const futureBookings = allBookings.filter((booking) => {
            const bookingDate = new Date(booking.date.year, booking.date.month - 1, booking.date.day);
            return bookingDate >= new Date();
          });
          setFutureBookings(futureBookings);
          setBookings(allBookings);
        }
      } catch (error : unknown) {
        if (error instanceof Error) {
            console.error(`Error fetching data: ${error.message}`);
        } else {
          console.error("Unknown error:", error);
        }
      } 
    };

    fetchInitialData();
  }, [user, showBookingOverlay]);

  const handleSelect = (value: any) => {
    setSelectedTeacher(value);
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Please sign in to access this page</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col gap-4 p-4">
      <Card className="rounded-xl shadow-md">
        <CardContent>
          <div className=" p-6 space-y-1">
            <CardTitle className="text-3xl font-semibold text-foreground transition-colors duration-200">
              {selectedTeacher && teachers[selectedTeacher]
                ? `${teachers[selectedTeacher].nickname}${t("student.teacherRate", {
                    price: teachers[selectedTeacher].pricing,
                  })}`
                : t("student.selectTeacherPrompt")}
            </CardTitle>
            <CardDescription className="text-lg">
              {t("student.greeting")}, {user.nickname}
            </CardDescription>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-muted-foreground animate-pulse" />
              <h1 className="text-base font-semibold text-foreground">
                <time dateTime={new Date().toISOString()}>
                  {new Date().toLocaleString("default", { month: "long" })} {new Date().getFullYear()}
                </time>
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="transition-transform hover:scale-105 duration-200">
                <LanguageSwitcher />
              </div>

              <Button
                onClick={() => setShowStudentProfileOverlay(true)}
                variant="outline"
                className="flex items-center space-x-2 transition-all duration-200 hover:scale-105 rounded-lg"
              >
                <UserCircle className="h-4 w-4" />
                <span>{t("student.profile")}</span>
              </Button>

              <div className="transition-transform hover:scale-105 duration-200">
                <Select value={selectedTeacher || "default"} onValueChange={(value: number) => handleSelect(value)}>
                  <SelectTrigger className="w-[200px] rounded-lg">
                    <SelectValue placeholder={t("student.selectTeacher")} />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg">
                    <SelectItem value="default">{t("student.selectTeacher")}</SelectItem>
                    {teachers &&
                      Object.entries(teachers).map(([id, teacher]) => (
                        <SelectItem key={id} value={id}>
                          {teacher.nickname}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <StudentCalendar selectedTeacher={selectedTeacher} />

      <Card className="rounded-xl shadow-md">
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="debug" className="border-none">
              <AccordionTrigger className="text-sm hover:no-underline px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Code2 className="h-4 w-4" />
                  <span>Debug Information</span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="h-[300px] w-full rounded-lg border m-4 p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">User Info:</h3>
                      <pre className="text-xs bg-muted p-2 rounded">
                        {JSON.stringify({ uid: user.uid, nickname: user.nickname }, null, 2)}
                      </pre>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Selected Teacher:</h3>
                      <pre className="text-xs bg-muted p-2 rounded">
                        {JSON.stringify(selectedTeacher ? teachers[selectedTeacher] : null, null, 2)}
                      </pre>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Future Bookings:</h3>
                      <pre className="text-xs bg-muted p-2 rounded">{JSON.stringify(futureBookings, null, 2)}</pre>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">All Bookings:</h3>
                      <pre className="text-xs bg-muted p-2 rounded">{JSON.stringify(bookings, null, 2)}</pre>
                    </div>
                  </div>
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      {showStudentProfileOverlay && <StudentProfileOverlay />}
    </div>
  );
}
