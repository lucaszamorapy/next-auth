import { IRouteParams } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Product } from "@/generated/prisma/client";
import { apiFetch } from "@/lib/api";
import Link from "next/link";

const ProductPage = async ({ params }: IRouteParams) => {
  const { id } = await params;
  let product: Product = {} as Product;
  const res = await apiFetch(`/products/${id}`, "GET", { cache: "no-store" });
  product = res.data;
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Detalhes do Produto</h1>
          <p className="text-muted-foreground">
            Visualização completa do produto
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Button asChild variant="outline">
            <Link href="/products">Voltar</Link>
          </Button>
          <Button asChild>
            <Link href={`${product.id}/checkout`}>Comprar</Link>
          </Button>
        </div>
      </header>

      <Card>
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <Badge variant="secondary">ID #{product.id}</Badge>
          </div>
          <CardDescription>
            {product.description ?? "Este produto não possui descrição."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Preço</p>
              <p className="text-xl font-semibold">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(product.price)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
