import { Button, Card, Icon, IndexTable } from "@shopify/polaris";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
function Table({ productList, onDelete, onEdit }) {
  const handleDeleteProduct = (id) => {
    onDelete(id);
  };

  const handleEditProduct = (product) => {
    onEdit(product);
  };

  const rowMarkup = productList.map((product, index) => (
    <IndexTable.Row id={product.id} key={product.id}>
      <IndexTable.Cell>{index + 1}</IndexTable.Cell>
      <IndexTable.Cell>{product.title}</IndexTable.Cell>
      <IndexTable.Cell>{product.description}</IndexTable.Cell>
      <IndexTable.Cell>
        {product.price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </IndexTable.Cell>
      <IndexTable.Cell>{product.Brand.name}</IndexTable.Cell>
      <IndexTable.Cell>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Button
              outline
              style={{ marginRight: "20px" }}
              onClick={() => handleDeleteProduct(product.id)}
            >
              <Icon source={DeleteMinor} color="base" />
            </Button>
          </div>
          <div>
            <Button primary onClick={() => handleEditProduct(product)}>
              <Icon source={EditMinor} color="base" />
            </Button>
          </div>
        </div>
      </IndexTable.Cell>
    </IndexTable.Row>
  ));

  return (
    <>
      <Card>
        <IndexTable
          itemCount={productList.length}
          selectable={false}
          headings={[
            { title: "Id" },
            { title: "Title" },
            { title: "Description" },
            { title: "Price" },
            { title: "Brand" },
            { title: "Actions" },
          ]}
        >
          {rowMarkup}
        </IndexTable>
      </Card>
    </>
  );
}

export default Table;
