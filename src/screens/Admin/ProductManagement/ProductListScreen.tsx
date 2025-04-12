import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Product } from '../../../models/Product';
import { LoadingIndicator } from '../../../components/LoadingModal/LoadingIndicator';
import { colors } from '../../../config/colors';
import httpAxiosClient from '../../../config/httpclient';
import ProductService from '../../../services/product/productApiResponse';
const mockProducts: Product[] = [
    {
      id: '1',
      title: 'Premium Yoga Mat',
      description: 'Eco-friendly, non-slip yoga mat with carrying strap',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      category: 'Fitness',
      price: 2999,
      image: 'https://example.com/yoga-mat.jpg',
      publishedDate: '2023-05-15T10:30:00Z',
      createdAt: '2023-05-10T08:15:00Z',
      updatedAt: '2023-05-12T11:20:00Z'
    },
    {
      id: '2',
      title: 'Wireless Earbuds',
      description: 'Bluetooth 5.0 with 20hr battery life',
      content: 'Advanced noise cancellation technology...',
      category: 'Electronics',
      price: 5999,
      image: 'https://example.com/earbuds.jpg',
      publishedDate: '2023-06-20T14:45:00Z',
      createdAt: '2023-06-15T09:30:00Z',
      updatedAt: '2023-06-18T16:10:00Z'
    },
    {
      id: '3',
      title: 'Organic Green Tea',
      description: '100% organic leaves with antioxidant properties',
      content: 'Sourced from high-altitude tea gardens...',
      category: 'Food & Beverage',
      price: 499,
      image: 'https://example.com/green-tea.jpg',
      publishedDate: '2023-04-05T08:00:00Z',
      createdAt: '2023-03-28T11:45:00Z',
      updatedAt: '2023-04-02T10:15:00Z'
    },
    {
      id: '4',
      title: 'Leather Wallet',
      description: 'Genuine leather bifold wallet with RFID protection',
      content: 'Handcrafted with premium full-grain leather...',
      category: 'Accessories',
      price: 2499,
      image: 'https://example.com/wallet.jpg',
      publishedDate: '2023-07-10T12:00:00Z',
      createdAt: '2023-07-01T14:20:00Z',
      updatedAt: '2023-07-05T13:30:00Z'
    },
    {
      id: '5',
      title: 'Smart Water Bottle',
      description: 'Hydration tracker with temperature control',
      content: 'Syncs with your fitness app to monitor water intake...',
      category: 'Fitness',
      price: 1799,
      image: 'https://example.com/water-bottle.jpg',
      publishedDate: '2023-08-15T09:15:00Z',
      createdAt: '2023-08-10T10:45:00Z',
      updatedAt: '2023-08-12T15:00:00Z'
    }
  ];

export const ProductListScreen = () => {
    // const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const [products, setProducts] = useState<Product[]>(mockProducts);

    useEffect(() => {
        fetchProducts();
    }, []);

    // const fetchProducts = async () => {
    //     try {
    //         const response = await httpAxiosClient.get('/products');
    //         setProducts(response.data);
    //     } catch (error) {
    //         console.error('Error fetching products:', error);
    //         Alert.alert('Error', 'Failed to fetch products');
    //     } finally {
    //         setLoading(false);
    //         setRefreshing(false);
    //     }
    // };

    const fetchProducts = async () => {
        setLoading(true);
        const response = await ProductService.getProducts();
        
        if (response.success) {
          setProducts(response.data);
        } else {
          Alert.alert('Error', response.message);
        }
        
        setLoading(false);
        setRefreshing(false);
      };

    const handleRefresh = () => {
        setRefreshing(true);
        fetchProducts();
    };

    const handleEdit = (product: Product) => {
        // navigation.navigate('EditProduct', { product });
    };

    const handleDelete = async (productId: string) => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await httpAxiosClient.delete(`/products/${productId}`);
                            setProducts(products.filter(p => p.id !== productId));
                            Alert.alert('Success', 'Product deleted successfully');
                        } catch (error) {
                            console.error('Error deleting product:', error);
                            Alert.alert('Error', 'Failed to delete product');
                        }
                    },
                },
            ]
        );
    };

    const renderProductItem = ({ item }: { item: Product }) => (
        <View style={styles.productCard}>
            {item.image && (
                <Image
                    source={{ uri: item.image }}
                    style={styles.productImage}
                    resizeMode="cover"
                />
            )}
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.productPrice}>₹{item.price.toLocaleString()}</Text>
                <Text style={styles.productCategory}>{item.category}</Text>
                <Text style={styles.productDescription} numberOfLines={2}>
                    {item.description}
                </Text>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity
                    onPress={() => handleEdit(item)}
                    style={styles.actionButton}
                    testID="edit-button"
                >
                    <Icon name="edit" size={24} color={colors.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => handleDelete(item.id)}
                    style={styles.actionButton}
                    testID="delete-button"
                >
                    <Icon name="delete" size={24} color={colors.danger} />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (loading) {
        return <LoadingIndicator />;
    }

    return (
        <View style={styles.container} testID="product-list-screen">
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Product Management</Text>
                {/* <TouchableOpacity
                    style={styles.addButton}
                    onPress={() => navigation.navigate('AddProduct')}
                    testID="add-product-button"
                >
                    <Icon name="add" size={24} color={colors.white} />
                </TouchableOpacity> */}
            </View>

            <FlatList
                data={products}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No products found. .</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGray,
        elevation: 2,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.dark,
    },
    addButton: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },
    productCard: {
        backgroundColor: colors.white,
        borderRadius: 8,
        marginBottom: 16,
        flexDirection: 'row',
        overflow: 'hidden',
        elevation: 2,
        minHeight: 100,
    },
    productImage: {
        width: 100,
        height: '100%',
    },
    productInfo: {
        flex: 1,
        padding: 12,
        justifyContent: 'space-between',
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.dark,
        marginBottom: 4,
    },
    productPrice: {
        fontSize: 14,
        color: colors.primary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    productCategory: {
        fontSize: 12,
        color: colors.gray,
        marginBottom: 4,
    },
    productDescription: {
        fontSize: 12,
        color: colors.darkGray,
        lineHeight: 16,
    },
    actionsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        padding: 8,
        minWidth: 50,
    },
    actionButton: {
        padding: 8,
        alignItems: 'center',
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 20,
        color: colors.gray,
        fontSize: 16,
    },
});