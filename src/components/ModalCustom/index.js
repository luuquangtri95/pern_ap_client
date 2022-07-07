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
import formValidate from "../../validation/vaildateProduct";
import DropZoneCustom from "../DropZoneCustom";

const initState = {
  title: {
    value: "",
    error: "",
    validate: {
      require: [true, "Title is not empty"],
      minlength: [3, "Title at least 3 words"],
    },
  },
  description: {
    value: "",
    error: "",
    validate: {
      require: [true, "description is not empty"],
    },
  },
  price: {
    value: 0,
    error: "",
    validate: {
      require: [true, "Price is not empty and > 0$"],
    },
  },
  files: { value: [], error: "" },
  brandId: "1",
};

function ModalCustom({
  active,
  setActive,
  isAction,
  setIsAction,
  onDelete,
  onSubmit,
}) {
  // ! state management
  const [brandList, setBrandList] = useState([]);
  const [formData, setFormData] = useState(initState);

  const onChange = (name, value) => {
    let _formData = JSON.parse(JSON.stringify(formData));
    _formData.files = formData.files;
    _formData[name] = { ..._formData[name], error: "" };

    if (name === "brandId") {
      _formData[name] = value;
    }

    _formData[name].value = value;

    setFormData(_formData);
  };

  // handle validate form
  // formValidate();
  // const handleValidate = () => {
  //   try {
  //     const _formData = JSON.parse(JSON.stringify(formData));
  //     _formData.files = formData.files;

  //     let formValid = true;

  //     if (!_formData["title"].value) {
  //       formValid = false;

  //       _formData["title"] = {
  //         ..._formData["title"],
  //         error: "Title is not empty",
  //       };
  //     }

  //     if (!_formData["description"].value) {
  //       formValid = false;

  //       _formData["description"] = {
  //         ..._formData["description"],
  //         error: "Description is not empty",
  //       };
  //     }

  //     if (_formData["price"].value === 0 || _formData["price"].value < 100) {
  //       formValid = false;

  //       _formData["price"] = {
  //         ..._formData["price"],
  //         error: "Amount must be greater than 100$",
  //       };
  //     }

  //     if (!formValid) {
  //       setFormData(_formData);
  //     }

  //     return { formValid, formData: _formData };
  //   } catch (error) {
  //     return { formValid: false };
  //   }
  // };

  //

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

  const handleValidateField = () => {
    const _formData = JSON.parse(JSON.stringify(formData));

    const validateTitle = formValidate(_formData.title);

    if (validateTitle.success === false) {
      _formData.title.error = validateTitle.message;
    }

    const validateDescription = formValidate(_formData.description);
    if (validateDescription.success === false) {
      _formData.description.error = validateDescription.message;
    }

    const validatePrice = formValidate(_formData.price);
    if (validatePrice.success === false) {
      _formData.price.error = validatePrice.message;
    }

    setFormData(_formData);

    if (
      validateTitle.success &&
      validateDescription.success &&
      validatePrice.success
    ) {
      return {
        success: true,
        formData: _formData,
      };
    }
  };

  const handleSubmit = async () => {
    if (isAction.action === "create") {
      const formValid = handleValidateField();

      if (formValid) {
        const mapDataFromData = {
          title: formData.title.value,
          description: formData.description.value,
          price: formData.price.value,
          brandId: formData.brandId,
          files: formData.files.value,
        };

        await onSubmit(mapDataFromData);

        setFormData(initState);
        setIsAction(null);
        setActive(false);
      } else {
        setActive(true);
      }
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

    // setActive(false);
  };

  const handleMultiImage = (fileList) => {
    const _formData = JSON.parse(JSON.stringify(formData));
    _formData.files.value = [...fileList];

    setFormData(_formData);
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
                    error={formData.title.error}
                    value={formData.title.value}
                    onChange={(value) => onChange("title", value)}
                  />
                  <TextField
                    label="Description"
                    type="text"
                    error={formData.description.error}
                    value={formData.description.value}
                    onChange={(value) => onChange("description", value)}
                  />
                  <TextField
                    label="Price"
                    type="number"
                    error={formData.price.error}
                    value={formData.price.value}
                    onChange={(value) => onChange("price", value)}
                  />

                  <DropZoneCustom
                    errorMessage={formData.files.error}
                    onMultiImage={handleMultiImage}
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
