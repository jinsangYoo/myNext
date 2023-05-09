export type subMenuItemProps = {
  id: string
  name: string
  path: string
}

export type menuItemProps = {
  id: string
  name: string
  path: string
  description?: string
  subMenu: subMenuItemProps[]
}

export type menusProps = {
  version: string
  menus: menuItemProps[]
}

export const menus: menusProps = {
  version: '0.2',
  menus: [
    {
      id: 'add_in_cart',
      name: 'AddInCart',
      path: 'add_in_cart',
      subMenu: []
    },
    {
      id: 'appear_product',
      name: 'AppearProduct',
      path: 'appear_product',
      subMenu: []
    },
    {
      id: 'buy_done',
      name: 'BuyDone',
      path: 'buy_done',
      subMenu: []
    },
    {
      id: 'buy_cancel',
      name: 'BuyCancel',
      path: 'buy_cancel',
      subMenu: []
    },
    {
      id: 'delete_in_cart',
      name: 'DeleteInCart',
      path: 'delete_in_cart',
      subMenu: []
    },
    {
      id: 'join',
      name: 'Join',
      path: 'join',
      subMenu: []
    },
    {
      id: 'leave',
      name: 'Leave',
      path: 'leave',
      subMenu: []
    },
    {
      id: 'link',
      name: 'Link',
      path: 'link',
      subMenu: []
    },
    {
      id: 'login_for_api',
      name: 'LoginForAPI',
      path: 'login_for_api',
      subMenu: []
    },
    {
      id: 'pl',
      name: 'PL',
      path: 'pl',
      subMenu: []
    },
    {
      id: 'referrer',
      name: 'Referrer',
      path: 'referrer',
      description: 'debug 용도',
      subMenu: []
    },
    {
      id: 'search',
      name: 'Search',
      path: 'search',
      subMenu: []
    },
    {
      id: 'tel',
      name: 'Tel',
      path: 'tel',
      subMenu: []
    },
    {
      id: 'webview',
      name: 'Webview',
      path: 'webview',
      description: 'debug 용도',
      subMenu: []
    },
    {
      id: 'legacy',
      name: 'Legacy',
      path: 'legacy',
      description: 'debug 용도',
      subMenu: [
        { id: 'main', name: 'A 메인', path: 'main' },
        { id: 'cart', name: 'A 장바구니', path: 'cart' },
        { id: 'order', name: 'A 주문 목록', path: 'orderList' },
        { id: 'etc', name: 'A 기타', path: 'etc' }
      ]
    }
  ]
}
