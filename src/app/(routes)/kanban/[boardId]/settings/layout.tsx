import { MaxWidthWrapper } from "@/components/layout/max-width-wrapper"

import { BoardSettingsSidebar } from "./_components/sidebar"

const BoardSettingsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <MaxWidthWrapper className="flex">
      <BoardSettingsSidebar />
      <MaxWidthWrapper className="my-8">{children}</MaxWidthWrapper>
    </MaxWidthWrapper>
  )
}

export default BoardSettingsLayout
