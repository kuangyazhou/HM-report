/* eslint no-console: 0 */
export default function({ store, redirect, error }) {
    // console.log(store.state.authUser);
    // If user not connected, redirect to /
    if (!store.state.storeCode) {
        //未登录时禁大屏指挥中心按钮
        //   return redirect('/')
        // error({
        //         message: '对不起, 您还没有登陆, 无法浏览该页面',
        //         statusCode: 403
        //     })
        // return redirect('/')
    }
}