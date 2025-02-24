import { 
    Card, 
    CardBody, 
    Button, 
    Spacer, 
    Divider 
} from "@nextui-org/react";
import { useCartStore } from '@/hooks/cartStore';

const CartPage = () => {
    const { cart, count, removeFromCart, clearCart } = useCartStore();

    return (
        <Card className="mt-2 p-4">
            <h2 className="text-2xl font-bold mb-4">Your Cart ({count} items)</h2>

            {cart.length === 0 ? (
                <Card className="p-4">
                    <p className="text-gray-500">Your cart is empty</p>
                </Card>
            ) : (
                    <div className="flex flex-col gap-3">
                        {cart.map(item => (
                            <Card key={item.id} className="mb-2">
                                <CardBody>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-4">
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div>
                                                <h3 className="text-lg font-semibold">{item.title}</h3>
                                                <p className="text-gray-500">Quantity: {item.quantity}</p>
                                                <p className="font-bold">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                        <Button 
                                            auto 
                                            color="error" 
                                            size="sm" 
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove One
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}

                        <Spacer y={1} />
                        <Divider />
                        <Spacer y={1} />

                        <div className="flex justify-end">
                            <Button 
                                color="secondary" 
                                onClick={clearCart}
                            >
                                Clear Entire Cart
                            </Button>
                        </div>
                    </div>
                )}
        </Card>
    );
}

export default CartPage;
