export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface CreateCustomerDTO {
  customerName: string;
  customerType: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}
