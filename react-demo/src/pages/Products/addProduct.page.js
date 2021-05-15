import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { createNewProduct, getAllProducts } from "../../actions/product.action";
import { addInCart } from "../../actions/cart.action";
import { Accordion, Card, Button, Modal, Form, Table, Image, Alert } from 'react-bootstrap';


class addProductPage extends React.Component {

    state = {
        show: false,
        fields: {},
        errors: {},
        allProductsData: [],
        showAddCartAlert: false,
    }
    componentDidMount = async () => {
        await this.props.getAllProducts();
    }

    handleShow = (e) => {
        this.setState({ show: true })
        this.setState({ fields: {} })
    }

    handleClose = (e) => {
        this.setState({ show: false })
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //name="title"
        if (!fields["productName"]) {
            formIsValid = false;
            errors["productName"] = "Cannot be empty";
        }

        if (typeof fields["productName"] !== "undefined") {
            if (!fields["productName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["productName"] = "Only letters";
            }
        }

        if (!fields["quantity"]) {
            formIsValid = false;
            errors["quantity"] = "Cannot be empty";
        }

        if (typeof fields["quantity"] !== "undefined") {
            if (!fields["quantity"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["quantity"] = "Only number";
            }
        }

        if (!fields["unitPrice"]) {
            formIsValid = false;
            errors["unitPrice"] = "Cannot be empty";
        }

        if (typeof fields["unitPrice"] !== "undefined") {
            if (!fields["unitPrice"].match(/^[0-9]+$/)) {
                formIsValid = false;
                errors["unitPrice"] = "Only number";
            }
        }



        //name="body"
        if (!fields["description"]) {
            formIsValid = false;
            errors["description"] = "Cannot be empty";
        }

        if (typeof fields["description"] !== "undefined") {

            if (this.state.fields["description"].length < 15) {
                formIsValid = false;
                errors["description"] = "More than 15 character";
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    handleSaveClicked = async (e) => {
        e.preventDefault();
        if (this.handleValidation()) {
            //alert("Form submitted");
            const body = new FormData(this.form);
            await this.props.addNewProduct(body);
            await this.props.getAllProducts();
            this.handleClose();

        } else {
            console.log("errors ==>", this.state.errors)
            //alert("Form has errors.")
        }
    }

    addCart = async (product) => {
        product.productId = product._id;
        product.quantity = 1;

        await this.props.addProductInCart(product)
        this.setState({ showAddCartAlert: true })
        setTimeout(() => {
            this.setState({ showAddCartAlert: false })
        }, 2000);




    }

    static getDerivedStateFromProps(props, state) {
        const { allProducts } = props;
        if (allProducts) {
            return {
                allProductsData: allProducts.data
            }
        }
        return {}
    }

    render = () => {
        return (
            <>

                <Helmet>
                    <title>postsPage</title>
                </Helmet>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Product
                </Button>
                {this.state.showAddCartAlert &&
                    <Alert>
                        Product Added in Cart
                    </Alert>
                }

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Form onSubmit={this.handleSaveClicked.bind(this)} ref={el => (this.form = el)} name="postform" method="post">
                        <Modal.Header closeButton>
                            <Modal.Title>New Product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control as="input" type="productName" placeholder="Product Name" name="productName" onChange={this.handleChange.bind(this, "productName")} value={this.state.fields["productName"]} />
                                <span style={{ color: "red" }}>{this.state.errors["productName"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control as="input" type="quantity" placeholder="Quantity" name="quantity" onChange={this.handleChange.bind(this, "quantity")} value={this.state.fields["quantity"]} />
                                <span style={{ color: "red" }}>{this.state.errors["quantity"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Unit Price</Form.Label>
                                <Form.Control as="input" type="unitPrice" placeholder="Unit Price" name="unitPrice" onChange={this.handleChange.bind(this, "unitPrice")} value={this.state.fields["unitPrice"]} />
                                <span style={{ color: "red" }}>{this.state.errors["unitPrice"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" name="description" rows={3} onChange={this.handleChange.bind(this, "description")} value={this.state.fields["description"]} />
                                <span style={{ color: "red" }}>{this.state.errors["description"]}</span>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlSelect1">
                                <Form.Label>Product Image</Form.Label>
                                <Form.File id="formcheck-api-regular">
                                    <Form.File.Input name="productImage" onChange={this.handleChange.bind(this, "productImage")} />
                                </Form.File>
                                <span style={{ color: "red" }}>{this.state.errors["productImage"]}</span>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                        </Button>
                            <Button variant="primary" type="submit" onClick={this.handleSaveClicked.bind(this)}>
                                Save Changes
                        </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Description</th>
                            <th>Product Image</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!this.state.allProductsData && this.state.allProductsData.length > 0 && this.state.allProductsData.map((product, i) => {
                            return (
                                <tr key={product._id}>
                                    <td>{i + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.description}</td>
                                    <td><Image src={`${product.productImage}`} height="100" width="100" thumbnail /></td>
                                    <td>
                                        <Button variant="primary" onClick={() => this.addCart(product)}>
                                            Add Cart
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        allProducts: state.products.data,
        newProduct: state.products.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(getAllProducts()),
        addNewProduct: (newProduct) => dispatch(createNewProduct(newProduct)),
        addProductInCart: (cartData) => dispatch(addInCart(cartData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(addProductPage)