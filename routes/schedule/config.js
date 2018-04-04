/**
 * Created by Joe on 18/03/12.
 */
var addresses = {
    fish: [
        "0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d",
        "0x59613704ba809777c7358b1656c25f2011af8b17",
        "0xe3b64150a5f883973b87f1512c08aa23b91c2bca",
        "0xe664b441Fb18B3aF64FD87574fF9B050a953F282",
        "0x692722b189F3Ca6682afe0235fAd97417273eb88",
    ],
    bw: [
        "0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533"
    ],
    btc: [
        'r_MeI2MiNckImjC'
    ],
    ethfans: [
        '0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533',
        '0xd39accf82394fcb73cff0c9b1a4fcdb9d31095d2',
        '0xdea727cc7e2e290212f5b6fa03e06cd854f17c09',
        '0x98a82849237047294d1503d286310c0468a83c36',

        '0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d',
        '0x2097cdbc691a48f97914b8c8fb69591679dee488',
        '0xe3b64150a5f883973b87f1512c08aa23b91c2bca',
        '0xe664b441Fb18B3aF64FD87574fF9B050a953F282',
        '0x692722b189F3Ca6682afe0235fAd97417273eb88',
    ],
    dwarfpool: [
        '0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533',
        '0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d',
        '0x59613704ba809777c7358b1656c25f2011af8b17',
        '0xe3b64150a5f883973b87f1512c08aa23b91c2bca'
    ],
    alias:{
        "bw_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"巴迪ETH600台主池",
        "dwarfpool_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"巴迪ETH600台备用",
        "ethfans_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"巴迪ETH496台",
        "btccom_r_MeI2MiNckImjC":"松八BTC",
        "dwarfpool_0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d":"龙岩1000台原主池",
        "fish_0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d":"龙岩1000台原备用",
        "fish_0xe664b441Fb18B3aF64FD87574fF9B050a953F282":"龙岩950台原主池",
        "dwarfpool_0xe664b441Fb18B3aF64FD87574fF9B050a953F282":"龙岩950台原备用",
        "fish_0x2097cdbc691a48f97914b8c8fb69591679dee488":"龙岩800台原主池",
        "dwarfpool_0x2097cdbc691a48f97914b8c8fb69591679dee488":"龙岩800台原备用",
        "fish_0xe3b64150a5f883973b87f1512c08aa23b91c2bca":"龙岩600台原主池",
        "dwarfpool_0xe3b64150a5f883973b87f1512c08aa23b91c2bca":"龙岩600台原备用",
        "fish_0x692722b189F3Ca6682afe0235fAd97417273eb88":"淮安1700台原地址",
        "ethfans_0xd39accf82394fcb73cff0c9b1a4fcdb9d31095d2":"宝山150台",
        "ethfans_0x98a82849237047294d1503d286310c0468a83c36":"宝山600台地址A",
        "ethfans_0xdea727cc7e2e290212f5b6fa03e06cd854f17c09":"宝山600台地址B",
        "ethfans_0x6011e2312c9d9eb3d0b7c4df88a102af97caf64d":"龙岩1000台星火地址",
        "ethfans_0x2097cdbc691a48f97914b8c8fb69591679dee488":"龙岩800台星火地址",
        "ethfans_0xe3b64150a5f883973b87f1512c08aa23b91c2bca":"龙岩600台星火地址",
        "ethfans_0xe664b441Fb18B3aF64FD87574fF9B050a953F282":"龙岩950台星火地址",
        "ethfans_0x692722b189F3Ca6682afe0235fAd97417273eb88":"淮安1700台星火地址",
    },
    webhook: {
        "bw_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"https://oapi.dingtalk.com/robot/send?access_token=4e2262318219bad6f6e1a19de0f973957b7e1717fb74fa34f627426829166b10",
        "dwarfpool_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"https://oapi.dingtalk.com/robot/send?access_token=4e2262318219bad6f6e1a19de0f973957b7e1717fb74fa34f627426829166b10",
        "ethfans_0x78f596d47a1afd37c1c4a3c4b0c67e2deec54533":"https://oapi.dingtalk.com/robot/send?access_token=4e2262318219bad6f6e1a19de0f973957b7e1717fb74fa34f627426829166b10",
        "btccom_r_MeI2MiNckImjC":"https://oapi.dingtalk.com/robot/send?access_token=4e2262318219bad6f6e1a19de0f973957b7e1717fb74fa34f627426829166b10",
        "default":"https://oapi.dingtalk.com/robot/send?access_token=9af0ce951f9b374a779d206ae5c2d3265edf08dfc76f84020478298ccf3b7f74",
    }
}

module.exports = addresses;