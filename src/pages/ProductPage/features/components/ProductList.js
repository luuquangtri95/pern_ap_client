import { Button, Heading } from "@shopify/polaris";
import { useEffect, useState } from "react";
import ModalCustom from "../../../../components/ModalCustom";
import Table from "../../../../components/Table";
import productApi from "../../../../services/productApi";

function ProductList(props) {
  const [productList, setProductList] = useState([]);
  const [active, setActive] = useState(false);
  const [created, setCreated] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll();
        setProductList(response.data);
      } catch (error) {
        console.log("fetch to fail", error);
      }
    })();
  }, [productList]);

  const handleOpenModal = () => {
    setActive(true);
  };

  const handleCloseModal = () => {
    setActive(false);
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await productApi.create(formData);
      if (res.success) {
        setActive(false);
      }
    } catch (error) {
      console.log("create data not success", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await productApi.delete(id);
    } catch (error) {
      console.log("delete data fail", error);
    }
  };

  const handleEditProduct = (product) => {
    setCreated(product);
    setActive(true);
  };

  return (
    <div>
      <Heading>Product List</Heading>
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <Button primary onClick={handleOpenModal}>
          Add Product
        </Button>
      </div>

      <Table
        productList={productList}
        onDelete={handleDeleteProduct}
        onEdit={handleEditProduct}
      />

      {created ? (
        <ModalCustom
          active={active}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      ) : (
        <ModalCustom
          active={active}
          data={created}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

export default ProductList;
