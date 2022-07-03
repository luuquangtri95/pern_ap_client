import { Button, Heading } from "@shopify/polaris";
import { useEffect, useState } from "react";
import ModalCustom from "../../../../components/ModalCustom";
import Table from "../../../../components/Table";
import productApi from "../../../../services/productApi";

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [active, setActive] = useState(false);
  const [isAction, setIsAction] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await productApi.getAll();
        setProductList(response.data);
      } catch (error) {
        console.log("fetch to fail", error);
      }
    })();
  }, []);

  const openModalDeleteProduct = (product) => {
    setIsAction({ action: "delete", product });
  };

  const openModalAddProduct = () => {
    setActive(true);
    setIsAction({ action: "create" });
  };

  const openModalEditProduct = (product) => {
    console.log(product);
    setActive(true);
    setIsAction({ action: "edit", product });
  };

  const handleAcceptDelete = async (id) => {
    try {
      await productApi.delete(id);
    } catch (error) {
      console.log("delete data fail", error);
    }
  };

  const handleCreateProduct = async (product) => {
    try {
      await productApi.create(product);
    } catch (error) {
      console.log("create data fail", error);
    }
  };

  const handleEditProduct = async (product) => {
    try {
      await productApi.update(product);
    } catch (error) {
      console.log("edit data fail", error);
    }
  };

  return (
    <div>
      <Heading>Product List</Heading>
      <div style={{ marginBottom: "20px", marginTop: "10px" }}>
        <Button primary onClick={openModalAddProduct}>
          Add Product
        </Button>
      </div>

      <Table
        productList={productList}
        onDelete={openModalDeleteProduct}
        onEdit={openModalEditProduct}
        setActive={setActive}
      />

      {isAction?.action === "delete" && (
        <ModalCustom
          active={active}
          setActive={setActive}
          isAction={isAction}
          setIsAction={setIsAction}
          onDelete={handleAcceptDelete}
        />
      )}

      {isAction?.action === "create" && (
        <ModalCustom
          active={active}
          setActive={setActive}
          isAction={isAction}
          setIsAction={setIsAction}
          onSubmit={handleCreateProduct}
        />
      )}

      {isAction?.action === "edit" && (
        <ModalCustom
          active={active}
          setActive={setActive}
          isAction={isAction}
          setIsAction={setIsAction}
          onSubmit={handleEditProduct}
        />
      )}
    </div>
  );
}

export default ProductList;
