import { usePathname } from 'next/navigation'

export function useBreadcrumb() {
  const pathname = usePathname()
  const segments = pathname.split('/').filter(segment => segment)

  const breadcrumbs = segments.map((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const label = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    const isLast = index === segments.length - 1

    return { href, label, isLast }
  })

  return [{ href: '/', label: 'Home', isLast: segments.length === 0 }, ...breadcrumbs]
}