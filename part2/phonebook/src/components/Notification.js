import React from 'react';


const Notification = ({message}) => {
    if (message === null){
        return null
    }
    var notificationStyle = {
        border: "2px solid",
        borderRadius: "5px",
        fontStyle: 'italic',
        fontSize:'16px',
        padding:'10px',
        marginBottom:'30px',
    }
    var notificationType = ''
    if(message.notificationType === 'info'){
        notificationStyle={...notificationStyle,
            borderColor: '#097c67',
            color:'#097c67',
            backgroundColor:'#bbe2db',
        }
        notificationType = 'INFO : '
    }
    else if(message.notificationType === 'error'){
        notificationStyle = {...notificationStyle,
            borderColor: '#f40606',
            color:'#f40606',
            backgroundColor:'#fed2d2',
        }
        notificationType = 'ERROR : '
    }
    

    return (
        <div style={notificationStyle}>
            {notificationType + message.message}
        </div>
    );
};

export default Notification