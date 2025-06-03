'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchProducts, deleteProduct } from '@/store/slices/products';
import { Button } from '@/components/ui/Button';
import { Table } from '@/components/ui/Table';
import { Column, Product, RootState } from '@/types';

export function ProductList() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({}));
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const columns: Column<Product>[] = [
    { header: 'Name', accessor: 'name' },
    { 
      header: 'Price', 
      accessor: 'price',
      render: (value) => `$${(value as number).toFixed(2)}`
    },
    { header: 'Stock', accessor: 'stock' },
    {
      header: 'Actions',
      accessor: 'id',
      render: (value) => (
        <Button
          variant="danger"
          onClick={() => handleDelete(value as string)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        data={items}
        columns={columns}
      />
    </div>
  );
}