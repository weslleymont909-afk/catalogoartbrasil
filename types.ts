
export interface Product {
  id: number;
  nome: string;
  cm: string;
  valor: number;
  imagem?: string;
}

export interface CartItem extends Product {
  quantity: number;
}
