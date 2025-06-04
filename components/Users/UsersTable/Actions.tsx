import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { checkPermissions } from "@/hooks/functions/checkPermissions";
import useGetAdminPermissions from "@/hooks/roles/useGetAdminPermissions";
import useActivateUser from "@/hooks/users/useActivateUser";
import useBlockUser from "@/hooks/users/useBlockUser";
import Link from "next/link";

const ProductsActions = ({ rowData }) => {
  const locale = "en";
  const [activateUserHandler, userMsg] = useActivateUser(locale);

  const [blockUserHandler, userMsg2] = useBlockUser(locale);
  const [adminPermissionsList] = useGetAdminPermissions(locale);

  return (
    <>
      <DropdownMenuItem
        onClick={() => navigator.clipboard.writeText(rowData?.name_en)}
      >
        Copy product name
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      {checkPermissions(adminPermissionsList, "users_show") ? (
        <DropdownMenuItem>
          <Link href={`/products/${rowData?.id}`}>View product details</Link>
        </DropdownMenuItem>
      ) : null}
      <DropdownMenuSeparator />
      {checkPermissions(adminPermissionsList, "users_show") ? (
        <DropdownMenuItem>
          <Link href={`/products/${rowData?.id}`}>Update product</Link>
        </DropdownMenuItem>
      ) : null}
      {/* {checkPermissions(adminPermissionsList, "users_operation") ? (
        <DropdownMenuItem onClick={() => activateUserHandler(rowData?.id)}>
          Activate this user
        </DropdownMenuItem>
      ) : null}

      {checkPermissions(adminPermissionsList, "users_operation") ? (
        <DropdownMenuItem onClick={() => blockUserHandler(rowData?.id, "")}>
          {rowData?.block === "0" ? "Block this user" : "Un block this user"}
        </DropdownMenuItem>
      ) : null} */}
    </>
  );
};

export default ProductsActions;
