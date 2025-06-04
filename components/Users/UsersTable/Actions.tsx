import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

const ProductsActions = ({ rowData }: any) => {
  const locale = "en";

  return (
    <>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(rowData?.name_en)}
      >
        Copy product name
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/products/${rowData?.id}`}>View product details</Link>
      </DropdownMenuItem>

      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={`/products/${rowData?.id}`}>Update product</Link>
      </DropdownMenuItem>
    </>
  );
};

export default ProductsActions;
