"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Edit,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import {
  deleteReservation,
  exportToExcel,
  getReservations,
  Pagination,
} from "@/hooks/Dashboard";
import { ReservationDash, useReservationDashboardStore } from "@/store/Store";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ReservationEditForm, { ReservationFormValues } from "./Modal";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { reservations, setReservations } = useReservationDashboardStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(null as string | null);

  const [selectedReservation, setSelectedReservation] =
    useState<ReservationFormValues | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const TokenAdmin = localStorage.getItem("TokenAdmin") ?? "";

  const fetchReservations = async (
    page: number,
    status: string | null = null
  ) => {
    setIsLoading(true);

    try {
      const params: Pagination = {
        page,
        limit: 10,
        token: TokenAdmin,
      };

      if (status) {
        params.status = status;
      }

      const data = await getReservations(params);

      if (data) {
        setReservations(data.data);
        setTotalPages(data.meta.lastPage);
        setCurrentPage(page);
        setCurrentStatus(status);
      }
    } catch (error) {
      console.error("Error fetching reservations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations(1, currentStatus);
  }, []);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchReservations(currentPage - 1, currentStatus);
    }
  };

  const handleNextPage = () => {
    fetchReservations(currentPage + 1, currentStatus);
  };

  const handleStatusChange = (status: string) => {
    fetchReservations(1, status === "all" ? null : status);
  };

  const handleEditReservation = (reservation: ReservationDash) => {
    setSelectedReservation({ ...reservation });
    setIsEditModalOpen(true);
  };

  const handleDeleteReservation = async () => {
    try {
      if (selectedReservation) {
        await deleteReservation(selectedReservation.email, TokenAdmin);
        fetchReservations(currentPage, currentStatus);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  const handleExport = () => {
    try {
      const token = localStorage.getItem("TokenAdmin");
      exportToExcel(token);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRefresh = () => {
    fetchReservations(currentPage, currentStatus);
  };

  return (
    <>
      <section className="h-screen bg-white">
        <Card className="w-full mx-auto border-none shadow-none">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex flex-col items-center mt-10">
              <CardTitle>Dashboard of Reservations</CardTitle>
              <p className="w-full mt-3 text-lg italic">
                List of {currentStatus} Reservations
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 md:flex-row">
              <Select onValueChange={handleStatusChange} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter Reservations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reservations</SelectItem>
                  <SelectItem value="Confirmed">
                    Confirmed Reservations
                  </SelectItem>
                  <SelectItem value="Not Going">
                    Not Going Reservations
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button
                className="inline-flex items-center px-4 py-2 font-bold text-white bg-green-600 rounded hover:bg-green-700"
                onClick={handleExport}
              >
                <FileSpreadsheet className="w-5 h-5 mr-2" />
                <span>Export to Excel</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="min-h-[500px] relative">
              {isLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    <span className="text-lg font-medium">
                      Loading reservations...
                    </span>
                  </div>
                </div>
              )}

              <div
                className={cn(
                  "transition-opacity duration-300 min-h-[40rem] ",
                  isLoading ? "opacity-30" : "opacity-100"
                )}
              >
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-bold text-black">
                        Email
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Phone Number
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        People coming
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Notes
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Status
                      </TableHead>
                      <TableHead className="font-bold text-black">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reserve, index) => (
                      <TableRow key={index}>
                        <TableCell>{reserve.email}</TableCell>
                        <TableCell>{reserve.phoneNumber}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {reserve.peopleComing.map((person, personIndex) => (
                              <Badge
                                key={personIndex}
                                variant="secondary"
                                className="text-xs sm:text-sm"
                              >
                                {`${person.firstName} ${person.lastName}`}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{reserve.notes}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reserve.status === "Confirmed"
                                ? "success"
                                : "destructive"
                            }
                            className="text-xs sm:text-sm"
                          >
                            {reserve.status === "Confirmed"
                              ? "Going"
                              : "Not Going"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditReservation(reserve)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-center py-4 mt-4 space-x-2">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1 || isLoading}
                  className={cn(
                    "px-3 py-2 sm:px-4 sm:py-3 border border-black rounded-lg transition-all",
                    currentPage === 1 || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 active:scale-95"
                  )}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="sr-only">Previous page</span>
                </button>
                <div className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </div>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages || isLoading}
                  className={cn(
                    "px-3 py-2 sm:px-4 sm:py-3 border border-black rounded-lg transition-all",
                    currentPage === totalPages || isLoading
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-gray-100 active:scale-95"
                  )}
                >
                  <ChevronRight className="w-4 h-4" />
                  <span className="sr-only">Next page</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <ReservationEditForm
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedReservation={selectedReservation}
        handleDeleteReservation={handleDeleteReservation}
        onRefreshReservations={handleRefresh}
      />
    </>
  );
};

export default Dashboard;
