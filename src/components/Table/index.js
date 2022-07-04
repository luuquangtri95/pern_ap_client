import { Button, Card, Icon, IndexTable } from "@shopify/polaris";
import { DeleteMinor, EditMinor } from "@shopify/polaris-icons";
import { convertImgUrl } from "../../helpers/convertUrlImage";
function Table({ productList, onDelete, onEdit, setActive }) {
  const handleDeleteProduct = (product) => {
    onDelete(product);
    setActive(true);
  };

  const handleEditProduct = (product) => {
    onEdit(product);
    setActive(true);
  };

  const rowMarkup = productList.map((product, index) => (
    <IndexTable.Row id={product.id} key={product.id}>
      <IndexTable.Cell>{index + 1}</IndexTable.Cell>
      <IndexTable.Cell>
        <img
          width={70}
          height={70}
          src={
            product.imageList.length === 0
              ? "https://via.placeholder.com/80x80"
              : convertImgUrl(product.imageList[0])
          }
          alt={product.title}
        />
      </IndexTable.Cell>
      <IndexTable.Cell>{product?.title}</IndexTable.Cell>
      <IndexTable.Cell>{product?.description}</IndexTable.Cell>
      <IndexTable.Cell>
        {product?.price?.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </IndexTable.Cell>
      <IndexTable.Cell>{product?.brand?.name}</IndexTable.Cell>
      <IndexTable.Cell>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "20px" }}>
            <Button
              outline
              style={{ marginRight: "20px" }}
              onClick={() => handleDeleteProduct(product)}
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
            { title: "Image" },
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
