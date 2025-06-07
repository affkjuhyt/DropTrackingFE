import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/shadcn/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/shadcn/card";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Button } from "@/components/ui/shadcn/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
import { Checkbox } from "@/components/ui/shadcn/checkbox";
import { Textarea } from "@/components/ui/shadcn/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/shadcn/table";

export default function NewProductPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
        <div className="flex gap-2">
          <Button>Lưu</Button>
        </div>
      </div>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="accounting">Accounting</TabsTrigger>
          <TabsTrigger value="purchasing">Purchasing</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="tax">Tax</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
          <TabsTrigger value="manufacturing">Manufacturing</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Product Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="product_code">Product Code</Label>
                  <Input id="product_code" placeholder="Enter product code" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product_name">Product Name</Label>
                  <Input id="product_name" placeholder="Enter product name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="categories">Categories</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="disabled" />
                  <Label htmlFor="disabled">Disabled</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="maintain_stock" />
                  <Label htmlFor="maintain_stock">Maintain Stock</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="has_variants" />
                  <Label htmlFor="has_variants">Has Variants</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="opening_stock">Opening Stock</Label>
                  <Input id="opening_stock" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuation_rate">Valuation Rate</Label>
                  <Input id="valuation_rate" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="standard_selling_rate">Standard Selling Rate</Label>
                  <Input id="standard_selling_rate" type="number" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="is_fixed_asset" />
                  <Label htmlFor="is_fixed_asset">Is Fixed Asset</Label>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit_of_measure">Unit of Measure</Label>
                  <Input id="unit_of_measure" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter product description" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="shelf_life">Shelf Life In Days</Label>
                  <Input id="shelf_life" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warranty_period">Warranty Period (in days)</Label>
                  <Input id="warranty_period" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="end_of_life">End of Life</Label>
                  <Input id="end_of_life" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight_per_unit">Weight per Unit</Label>
                  <Input id="weight_per_unit" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="material_request_type">Default Material Request Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="manufacture">Manufacture</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight_uom">Weight UOM</Label>
                  <Input id="weight_uom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valuation_method">Valuation Method</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fifo">FIFO</SelectItem>
                      <SelectItem value="lifo">LIFO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="allow_negative_stock" />
                  <Label htmlFor="allow_negative_stock">Allow Negative Stock</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Barcodes</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Barcode</TableHead>
                      <TableHead>Barcode Type</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Input placeholder="Enter barcode" />
                      </TableCell>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ean">EAN</SelectItem>
                            <SelectItem value="upc">UPC</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accounting">
          <Card>
            <CardHeader>
              <CardTitle>Deferred Accounting</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Service Start Date</TableHead>
                    <TableHead>Service End Date</TableHead>
                    <TableHead>Service Period</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select account" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="account1">Account 1</SelectItem>
                          <SelectItem value="account2">Account 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input type="date" />
                    </TableCell>
                    <TableCell>
                      <Input type="date" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" placeholder="Days" />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchasing">
          <Card>
            <CardHeader>
              <CardTitle>Purchasing Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="purchase_uom">Default Purchase Unit of Measure</Label>
                  <Input id="purchase_uom" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min_order_qty">Minimum Order Qty</Label>
                  <Input id="min_order_qty" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lead_time">Lead Time in Days</Label>
                  <Input id="lead_time" type="number" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="delivered_by_supplier" />
                  <Label htmlFor="delivered_by_supplier">Delivered by Supplier (Drop Ship)</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Supplier Details</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Supplier</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Lead Time (days)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select supplier" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="supplier1">Supplier 1</SelectItem>
                            <SelectItem value="supplier2">Supplier 2</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="Enter price" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" placeholder="Enter lead time" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <Card>
            <CardHeader>
              <CardTitle>Sales Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Sales configuration will be added here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Tax configuration will be added here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quality">
          <Card>
            <CardHeader>
              <CardTitle>Quality Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Quality configuration will be added here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manufacturing">
          <Card>
            <CardHeader>
              <CardTitle>Manufacturing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">Manufacturing configuration will be added here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}