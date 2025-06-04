import styles from "./styles.module.scss";
import { DataTable } from "./UsersTable/data-table";
import { columns } from "./UsersTable/columns";

const Users = () => {
  return (
    <section className={styles.users}>
      <div className={styles.secContainer}>
        <DataTable
          columns={columns}
          data={[]}
          searchHandler={searchHandler}
          filterHandler={filterHandler}
          filterByDatesHandler={filterByDatesHandler}
          take={take}
          clearFiltersAndSearchHandler={clearFiltersAndSearchHandler}
        />
      </div>
    </section>
  );
};

export default Users;
