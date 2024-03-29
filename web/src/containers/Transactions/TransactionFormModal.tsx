import { CategoryPicker } from "@/components/CategoryPicker";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { useAccountContext } from "@/hooks/contexts";
import { useMutation } from "@/hooks/useMutation";
import {
  appendSecondsAndMilis,
  formatDateForInput,
  getDateFromTimestamp,
  getUnixTimestamp,
} from "@/utils/dates";
import {
  DatabaseMutationOperation,
  Transaction as TransactionType,
} from "@/validators/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { TypeOf, z } from "zod";
import styles from "./styles.module.css";

export type ModalTransaction = Omit<
  TransactionType,
  "id" | "amount" | "pubKeyHex" | "currency" | "updatedAt" | "deletedAt"
> & { id: string | null; amount: number | null };

type Props = {
  transaction: ModalTransaction;
  onSuccess: () => void;
  onClose: () => void;
};

const schema = z.object({
  title: z.string().min(1),
  amount: z.number(),
  categoryId: z.string().nullable(),
  createdAt: z.string(),
});

type FormValues = TypeOf<typeof schema>;

export const TransactionFormModal = ({
  transaction,
  onSuccess,
  onClose,
}: Props) => {
  const { pubKeyHex } = useAccountContext();
  const { mutate } = useMutation({
    onSettled: () => {
      onSuccess();
      onClose();
    },
  });

  const onSubmit = async ({
    categoryId,
    title,
    amount,
    createdAt,
  }: FormValues) =>
    mutate({
      operation: DatabaseMutationOperation.Upsert,
      tableName: "transactions",
      columnDataMap: {
        id: transaction.id || crypto.randomUUID(),
        title,
        amount: Math.abs(amount),
        pubKeyHex: pubKeyHex,
        categoryId: categoryId || null,
        deletedAt: null,
        createdAt: getUnixTimestamp(
          new Date(appendSecondsAndMilis(transaction.createdAt, createdAt))
        ),
      },
    });

  const onDelete = async () =>
    mutate({
      operation: DatabaseMutationOperation.Delete,
      tableName: "transactions",
      identifierValue: transaction.id as string,
    });

  return (
    <Modal onClose={onClose} header={<strong>add expense</strong>}>
      <Form<FormValues>
        onSubmit={onSubmit}
        resolver={zodResolver(schema)}
        values={{
          categoryId: transaction.categoryId,
          createdAt: formatDateForInput(
            getDateFromTimestamp(transaction.createdAt)
          ),
          title: transaction.title,
          amount: transaction.amount ?? NaN,
        }}
      >
        <fieldset>
          <Input name="title" placeholder="title" aria-label="title" />

          <Input name="createdAt" aria-label="date" type="datetime-local" />

          <div role="group">
            <div className={styles["margin-right"]}>
              <CategoryPicker name="categoryId" />
            </div>

            <Input
              name="amount"
              options={{ valueAsNumber: true }}
              placeholder="amount"
              type="number"
              aria-label="amount"
            />
          </div>
        </fieldset>

        <div className={styles["flex-container"]}>
          {transaction.id && (
            <button
              type="button"
              className={`contrast ${styles.flex}`}
              onClick={onDelete}
            >
              delete
            </button>
          )}

          <button className={styles.flex} type="submit">
            {transaction.id ? "save" : "add"}
          </button>
        </div>
      </Form>
    </Modal>
  );
};
