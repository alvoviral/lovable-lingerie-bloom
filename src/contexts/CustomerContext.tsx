
import { createContext, useContext, useState, ReactNode } from "react";
import { Customer } from "@/types/customer";
import { getInitialCustomers } from "@/utils/customerUtils";
import { toast } from "sonner";

type CustomerContextType = {
  customers: Customer[];
  selectedCustomer: Customer | null;
  filteredCustomers: Customer[];
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDetailDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  searchQuery: string;
  activeFilter: string;
  setSelectedCustomer: (customer: Customer | null) => void;
  setIsAddDialogOpen: (isOpen: boolean) => void;
  setIsEditDialogOpen: (isOpen: boolean) => void;
  setIsDetailDialogOpen: (isOpen: boolean) => void;
  setIsDeleteDialogOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
  setActiveFilter: (filter: string) => void;
  handleAddCustomer: (newCustomer: Customer) => void;
  handleEditCustomer: (updatedCustomer: Customer) => void;
  handleDeleteCustomer: () => void;
  handleViewCustomer: (customer: Customer) => void;
  openEditDialog: () => void;
  openDeleteDialog: () => void;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Initialize customer data
  useState(() => {
    setCustomers(getInitialCustomers());
  });

  // Filter customers based on search and segment filter
  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === "all") return matchesSearch;
    return matchesSearch && customer.segment.toLowerCase() === activeFilter.toLowerCase();
  });

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    setIsAddDialogOpen(false);
    toast.success("Cliente adicionado", {
      description: `${newCustomer.name} foi adicionado(a) com sucesso à sua base de clientes.`
    });
  };

  const handleEditCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    
    setCustomers(updatedCustomers);
    setIsEditDialogOpen(false);
    toast.success("Cliente atualizado", {
      description: `Os dados de ${updatedCustomer.name} foram atualizados com sucesso.`
    });
  };

  const handleDeleteCustomer = () => {
    if (!selectedCustomer) return;
    
    const updatedCustomers = customers.filter(customer => customer.id !== selectedCustomer.id);
    const customerName = selectedCustomer.name;
    
    setCustomers(updatedCustomers);
    setIsDeleteDialogOpen(false);
    setSelectedCustomer(null);
    
    toast.success("Cliente excluído", {
      description: `${customerName} foi removido(a) da sua base de clientes.`
    });
  };

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailDialogOpen(true);
  };

  const openEditDialog = () => {
    setIsDetailDialogOpen(false);
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = () => {
    setIsDetailDialogOpen(false);
    setIsDeleteDialogOpen(true);
  };

  const value = {
    customers,
    selectedCustomer,
    filteredCustomers,
    isAddDialogOpen,
    isEditDialogOpen,
    isDetailDialogOpen,
    isDeleteDialogOpen,
    searchQuery,
    activeFilter,
    setSelectedCustomer,
    setIsAddDialogOpen,
    setIsEditDialogOpen,
    setIsDetailDialogOpen,
    setIsDeleteDialogOpen,
    setSearchQuery,
    setActiveFilter,
    handleAddCustomer,
    handleEditCustomer,
    handleDeleteCustomer,
    handleViewCustomer,
    openEditDialog,
    openDeleteDialog,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (context === undefined) {
    throw new Error("useCustomers must be used within a CustomerProvider");
  }
  return context;
};
