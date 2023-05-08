export type subMenuItemProps = {
  id: string
  name: string
  path: string
}

export type menuItemProps = {
  id: string
  name: string
  path: string
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
      id: 'personal',
      name: 'A 대문',
      path: 'personal',
      subMenu: [
        { id: 'main', name: 'A 메인', path: 'main' },
        { id: 'community', name: 'A 게시판', path: 'community' },
        { id: 'about', name: 'A 여긴 어디', path: 'about' }
      ]
    },
    {
      id: 'myReact',
      name: 'A myReact',
      path: 'myReact',
      subMenu: [
        { id: 'main', name: 'A 메인', path: 'main' },
        { id: 'openSourceLicense', name: 'A 라이센스', path: 'openSourceLicense' }
      ]
    },
    {
      id: 'mall',
      name: 'A 커머스(가상)',
      path: 'mall',
      subMenu: [
        { id: 'main', name: 'A 메인', path: 'main' },
        { id: 'cart', name: 'A 장바구니', path: 'cart' },
        { id: 'order', name: 'A 주문 목록', path: 'orderList' },
        { id: 'etc', name: 'A 기타', path: 'etc' }
      ]
    },
    {
      id: 'member',
      name: 'A 로그인/가입/탈퇴',
      path: 'member',
      subMenu: [
        { id: 'main', name: 'A 로그인', path: 'main' },
        { id: 'join', name: 'A 가입', path: 'join' },
        { id: 'leave', name: 'A 탈퇴', path: 'leave' }
      ]
    },
    {
      id: 'search',
      name: 'A 검색',
      path: 'search',
      subMenu: [{ id: 'main', name: 'A 검색', path: 'main' }]
    },
    {
      id: 'etc',
      name: 'A 기타',
      path: 'etc',
      subMenu: [
        { id: 'main', name: 'A PL', path: 'main' },
        { id: 'push', name: 'A Push', path: 'push' }
      ]
    }
  ]
}