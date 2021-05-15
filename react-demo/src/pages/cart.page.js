import React from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getAllCarts, updateCart } from "../actions/cart.action";
import { Accordion, Card, Button, Modal, Form, Table, Image } from 'react-bootstrap';


class cartPage extends React.Component {
    state = {
        show: false,
        allCartsData: [],
        editId: "",
        fields: {},
        errors: {},
    }
    componentDidMount = async () => {
        await this.props.getAllCarts();
    }

    static getDerivedStateFromProps(props, state) {
        const { allCarts } = props;
        if (allCarts) {
            return {
                allCartsData: allCarts.data
            }
        }
        return {}
    }

    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    update = async (data) => {
        data.quantity = this.state.fields.quantity
        await this.props.updateCart(data)
        this.setState({ editId: "" })
        await this.props.getAllCarts();
    }

    render = () => {
        return (
            <>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Description</th>
                            <th>Product Image</th>
                            <th>Total Price</th>
                            <th>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!this.state.allCartsData && this.state.allCartsData.length > 0 && this.state.allCartsData.map((product, i) => {
                            return (
                                <tr key={product._id}>
                                    <td>{i + 1}</td>
                                    <td>{product.productName}</td>
                                    <td>
                                        {this.state.editId !== product._id && product.quantity}
                                        {this.state.editId === product._id &&
                                            <Form.Group controlId="exampleForm.ControlInput1">
                                                <Form.Label>Quantity</Form.Label>
                                                <Form.Control as="input" type="quantity" placeholder="Quantity" name="quantity" onChange={this.handleChange.bind(this, "quantity")} value={this.state.fields["quantity"]} />
                                            </Form.Group>
                                        }
                                    </td>
                                    <td>{product.unitPrice}</td>
                                    <td>{product.description}</td>
                                    <td><Image src={`${product.productImage}`} height="100" width="100" thumbnail /></td>
                                    <td>
                                        {product.totalPrice}
                                    </td>
                                    <td>
                                        {this.state.editId !== product._id &&
                                            <Button key={product.id} variant="primary" onClick={() => this.setState({ editId: product._id })}>
                                                Edit Qty
                                            </Button>
                                        }
                                        {this.state.editId === product._id &&
                                            <Button key={product.id} variant="primary" onClick={() => this.update(product)}>
                                                Save
                                            </Button>
                                        }
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
        allCarts: state.cart.data,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCarts: () => dispatch(getAllCarts()),
        updateCart: (data) => dispatch(updateCart(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(cartPage)