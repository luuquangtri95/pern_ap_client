import {
  Button,
  Form,
  FormLayout,
  Modal,
  Select,
  TextContainer,
  TextField,
} from "@shopify/polaris";
import { useEffect, useState } from "react";
import productApi from "../../services/productApi";

function ModalCustom({ active, onClose, onSubmit }) {
  const [brandList, setBrandList] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    brandId: "1",
  });

  const onChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData));
    _formData[name] = value;

    setFormData(_formData);
  };

  useEffect(() => {
    (async () => {
      const brands = await productApi.getAllBrand();

      setBrandList(brands.data);
    })();
  }, []);

  const options = brandList.map((brand) => {
    return {
      label: brand.name,
      value: "" + brand.id,
    };
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);
  };

  return (
    <div style={{ height: "500px" }}>
      <Modal
        // activator={activator}
        open={active}
        onClose={onClose}
        title="Add new Product"
        secondaryActions={[
          {
            content: "Cancel",
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  label="Title"
                  type="text"
                  value={formData.title}
                  onChange={(value) => onChange("title", value)}
                />
                <TextField
                  label="Description"
                  type="text"
                  value={formData.description}
                  onChange={(value) => onChange("description", value)}
                />
                <TextField
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={(value) => onChange("price", value)}
                />

                <Select
                  label="Select Brand"
                  options={options}
                  value={formData.brandId}
                  onChange={(value) => onChange("brandId", value)}
                />
                <Button primary submit>
                  Create
                </Button>
              </FormLayout>
            </Form>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </div>
  );
}

export default ModalCustom;
