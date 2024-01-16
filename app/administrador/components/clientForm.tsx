import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Switch,
} from "@nextui-org/react";
import { useEffect } from "react";
import { useEmployeeForm } from "../hooks/useEmployeeForm";
import { ICustomer } from "@/app/types/customer";
import { useClientForm } from "../hooks/useClientForm";

interface ProcessesFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  values?: ICustomer;
  isSubmitting?: boolean;
}

export const ClientsForm = ({
  isOpen,
  onOpenChange,
  values,
}: ProcessesFormProps) => {
  const isAddMode = !values?.id;
  const { formik } = useClientForm(values ?? ({} as ICustomer), () =>
    onOpenChange(false)
  );

  useEffect(() => {
    if (isAddMode) return;
    formik.setValues(values);
  }, [values]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => {
        formik.resetForm();
        onOpenChange(false);
      }}
      className="min-w-[900px]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isAddMode ? "Crear cliente" : "Editar cliente"}
            </ModalHeader>

            <form onSubmit={formik.handleSubmit}>
              <ModalBody className="grid grid-cols-2">
                <Input
                  id="id"
                  name="id"
                  type="name"
                  label="Cédula"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.id.toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.id && formik.errors.id
                      ? formik.errors.id
                      : ""
                  }
                />
                <Input
                  id="firstName"
                  name="firstName"
                  type="name"
                  label="Primer nombre"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.firstName && formik.errors.firstName
                      ? formik.errors.firstName
                      : ""
                  }
                />

                <Input
                  id="secondName"
                  name="secondName"
                  type="name"
                  label="Segundo nombre"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.secondName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.secondName && formik.errors.secondName
                      ? formik.errors.secondName
                      : ""
                  }
                />

                <Input
                  id="firstLastName"
                  name="firstLastName"
                  type="name"
                  label="Primer apellido"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.firstLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.firstLastName && formik.errors.firstLastName
                      ? formik.errors.firstLastName
                      : ""
                  }
                />

                <Input
                  id="secondLastName"
                  name="secondLastName"
                  type="name"
                  label="Segundo apellido"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.secondLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.secondLastName &&
                    formik.errors.secondLastName
                      ? formik.errors.secondLastName
                      : ""
                  }
                />

                <Input
                  id="email"
                  name="email"
                  type="name"
                  label="Correo electrónico"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.email && formik.errors.email
                      ? formik.errors.email
                      : ""
                  }
                />

                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="name"
                  label="Número de teléfono"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.phoneNumber && formik.errors.phoneNumber
                      ? formik.errors.phoneNumber
                      : ""
                  }
                />

                <Input
                  id="address"
                  name="address"
                  type="name"
                  label="Dirección"
                  variant="underlined"
                  className="w-full"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="lg"
                  errorMessage={
                    formik.touched.address && formik.errors.address
                      ? formik.errors.address
                      : ""
                  }
                />
              </ModalBody>

              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    formik.resetForm();
                    onClose();
                  }}
                >
                  Cancelar
                </Button>

                <Button
                  color="primary"
                  isDisabled={formik.isSubmitting}
                  type="submit"
                >
                  {isAddMode ? "Crear" : "Editar"}
                </Button>
              </ModalFooter>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
