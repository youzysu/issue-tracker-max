import labelIcon from "@assets/icon/label.svg";
import milestoneIcon from "@assets/icon/milestone.svg";
import plusIcon from "@assets/icon/plus.svg";
import FilterBar from "@components/FilterBar";
import { Table, TableBodyIssues, TableHeaderIssues } from "@components/Table";
import Button from "@components/common/Button";
import TabBar from "@components/common/TabBar";
import { styled } from "styled-components";

export default function IssuesPage() {
  const tabBarLeftInfo = { name: "레이블", count: 3, iconSrc: labelIcon };
  const tabBarRightInfo = {
    name: "마일스톤",
    count: 2,
    iconSrc: milestoneIcon,
  };

  return (
    <div>
      <IssuesNavBar>
        <FilterBar />

        <div className="right-wrapper">
          <TabBar
            left={tabBarLeftInfo}
            right={tabBarRightInfo}
            borderType="default"
          />
          <Button size="S" variant="container">
            <img src={plusIcon} alt="이슈 작성" />
            이슈 작성
          </Button>
        </div>
      </IssuesNavBar>

      <Table>
        <TableHeaderIssues />
        <TableBodyIssues issuesList={[{ title: "이슈 제목" }]} />
      </Table>
    </div>
  );
}

const IssuesNavBar = styled.div`
  width: 100%;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;

  .right-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
  }
`;
