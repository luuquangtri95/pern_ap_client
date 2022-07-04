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
import DropZoneCustom from "../DropZoneCustom";

function ModalCustom({
  active,
  setActive,
  isAction,
  setIsAction,
  onDelete,
  onSubmit,
}) {
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
    if (isAction.action === "edit")
      setFormData((prevState) => ({
        ...prevState,
        title: isAction.product.title,
        description: isAction.product.description,
        price: isAction.product.price,
        brandId: isAction.product?.brand?.id.toString(),
        id: isAction.product.id,
      }));
  }, []);

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

  const handleConfirmDelete = (id) => {
    onDelete(id);
    setIsAction(null);
  };

  const handleSubmit = async () => {
    if (isAction.action === "create") {
      await onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        price: 0,
        brandId: "1",
      });
      setIsAction(null);
    }

    if (isAction.action === "edit") {
      onSubmit(formData);
      setFormData({
        title: "",
        description: "",
        price: 0,
        brandId: "1",
      });

      setIsAction(null);
    }

    setActive(false);
  };

  const handleMultiImage = (fileList) => {
    setFormData((prevState) => ({
      ...prevState,
      files: fileList,
    }));
  };

  return (
    <>
      {isAction.action === "delete" && (
        <Modal
          open={active}
          onClose={() => setActive(false)}
          title="Delete product"
        >
          <Modal.Section>
            <TextContainer>
              <Form>
                <p>
                  Are you sure you want to delete this product
                  <span style={{ color: "red" }}>{isAction.product.title}</span>
                  ?
                </p>
                <div>
                  <Button onClick={() => setActive(false)}>Cancel</Button>

                  <Button
                    primary
                    onClick={() => handleConfirmDelete(isAction.product.id)}
                  >
                    Delete
                  </Button>
                </div>
              </Form>
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}

      {isAction.action === "create" && (
        <Modal
          open={active}
          onClose={() => setActive(false)}
          title="Add new Product"
        >
          <Modal.Section>
            <TextContainer>
              <Form
                onSubmit={handleSubmit}
                method="POST"
                enctype="multipart/form-data"
              >
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

                  <DropZoneCustom onMultiImage={handleMultiImage} />

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
      )}

      {isAction.action === "edit" && (
        <Modal
          open={active}
          onClose={() => setActive(false)}
          title="Edit Product"
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
                    Update
                  </Button>
                </FormLayout>
              </Form>
            </TextContainer>
          </Modal.Section>
        </Modal>
      )}
    </>
  );
}

export default ModalCustom;
