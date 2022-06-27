import MainNavigation from "./MainNavigation";
import styled from "styled-components"
const Main = styled.main`
{
  margin: 3rem auto;
  width: 100%;
  max-width: 70rem;
}`
interface LayoutProps {
  children: React.ReactNode;
}
function Layout(props: LayoutProps) {  
  return (
    <div>
      <MainNavigation />
      <Main >{props.children}</Main>
    </div>
  );
}

export default Layout;
