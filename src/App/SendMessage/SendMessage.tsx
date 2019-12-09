import React, { useState } from "react";

const SendMessage: React.FC = () => {
    return (
        <div>

        </div>
    )
};

const sendMessage = async message => {
    try {
        const result = await api.transact({
            actions: [{
                account: 'tropical',
                name: 'insert',
                authorization: [{
                    actor: 'tropical',
                    permission: 'active',
                }],
                data: {
                    user: 'tropical',
                    message
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.dir(result);
        return result;
    } catch (e) {
        console.log('\nCaught exception: ' + e);
        if (e instanceof RpcError)
            console.log(JSON.stringify(e.json, null, 2));
    }
};