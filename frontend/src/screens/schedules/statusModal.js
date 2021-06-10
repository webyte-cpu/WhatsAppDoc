import React from "react";
import { View, StyleSheet } from 'react-native'
import { Modal, Button, Card, Icon, Text, useTheme, SelectItem, Select } from '@ui-kitten/components'

const CloseIcon = (props) => { return <Icon {...props} style={[props.style, styles.closeIcon], { alignItems: "right" }} name='close-outline' /> }


const Footer = ({ onHide }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Button onPress={onHide}>Cancel</Button>
            <Button status="success" onPress={onHide}>Save</Button>
        </View>


    )
}

const StatusModal = ({ isShown, onHide }) => {
    const [status, setStatusData] = useState([]);

    const [selectedStatus, setSelectedStatus] = useState(null); // string
    const [selectedIndex, setSelectedIndex] = useState();

    const SelectStatus = ({ status }) => {
        const value = selectedIndex
        const displayValue = value

        const status = `${selectedStatus}`
        const renderOption = (status, index) => (
            <SelectItem
                key={index}
                title={`${status}`}
            />
        );

        return (
            <View style={{ marginVertical: 10 }}>
                <Select
                    label="STATUS"
                    placeholder={status}
                    value={displayValue}
                    selectedIndex={selectedIndex}
                    onSelect={(index) => {
                        setSelectedIndex(index);
                        setSelectedStatus(displayValue);
                    }}
                >
                    {status.map(renderOption)}
                </Select>
            </View>
        )
    }


    return (
        <View>
            <Modal
                visible={isShown}
                backdropStyle={styles.backdrop}
                onBackdropPress={onHide}>
                <Card
                    disabled={true}
                    footer={() => <Footer onHide={onHide} />}
                >
                    <View style={styles.container}>
                        <CloseIcon/>
                        <Text style={styles.text} category='h5'>Status</Text>

                        <SelectStatus status={status} />

                    </View>
                </Card>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    closeIcon: {
        width: 20,
        height: 20,
    },
    text: {
        textAlign: 'left'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    }
});

export default StatusModal;