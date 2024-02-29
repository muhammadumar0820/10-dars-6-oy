import '../../src/App.css';
import { useEffect, useState, Container } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function Home() {
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/api/products/private/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleClick(id) {
    const isDelete = confirm("Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz?");
    if (isDelete) {
        setIsLoading(true);
      fetch(`${import.meta.env.VITE_API}/api.products/private/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setIsLoading(false)
          if (
            data.message == "Mahsulot muvaffaqiyatli o'chirildi" ||
            data.message == "Mahsulot topilmadi"
          ) {
            let copied = JSON.parse(JSON.stringify(product));
            copied = copied.filter((pr) => {
              return pr.id != id;
            });
            setProducts(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <Container className = 'container'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow
                key={product.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {product.name}
                </TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.status}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">
                  {isLoading && <p>O'chirilmoqda</p>}
                  {!isLoading && (
                    <>
                      <EditIcon></EditIcon>
                      <DeleteIcon
                        onClick={() => {
                          handleClick(product.id);
                        }}
                      ></DeleteIcon>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Home;
