import { IRouteParams } from "@/app/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/generated/prisma/client";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

const CheckoutPage = async ({ params }: IRouteParams) => {
  const { id } = await params;
  let product: Product = {} as Product;
  try {
    const res = await apiFetch(`/products/${id}`, "GET", { cache: "no-store" });
    product = res.data;
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{product.name}</span>
            <span className="font-medium">
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </span>
          </div>

          <Separator />

          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Total</span>
            <span>
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </span>
          </div>

          <Button className="w-full mt-4">Finalizar compra</Button>

          <Button asChild variant="outline" className="w-full">
            <Link href={`/products/${product.id}`}>Voltar ao produto</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
