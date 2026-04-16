"use client";
import { Alert, Button, Center, Container, Group, Stack } from "@mantine/core";
import { useState } from "react";
import Tab, { TabType } from "./components/Tab";
import TopSummary from "./components/TopSummary";
import TabOverview from "./components/TabOverview";
import TabTransactions from "./components/TabTransactions";
import { SPLTIconSmall } from "@/components/SPLTIcon";
import { useParams } from "next/navigation";
import { useClaimGroup, useTotalSpend } from "@/api";
import MadeWithLove from "@/components/MadeWithLove";
import ToggleDarkLightMode from "@/components/ToggleDarkLightMode";
import Metadata from "@/components/Metadata";
import PinGateModal, { isGroupVerified } from "@/components/PinGateModal";
import { useAuth } from "@/providers/AuthProvider";
import { IconShield } from "@tabler/icons-react";

const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const groupData = useTotalSpend(groupId);
  const [selectedTab, setSelectedTab] = useState(TabType.Transactions);
  const { isAuthenticated, currentUser } = useAuth();
  const claimGroup = useClaimGroup();

  // PIN gate state: track verified status in component state (initialized from sessionStorage)
  const [verified, setVerified] = useState(() => isGroupVerified(groupId));

  const groupInfo = groupData.data?.expand.groupInfo;
  const isPrivate = groupInfo?.isPrivate ?? false;
  const owner = groupInfo?.owner ?? "";
  const isOwner = isAuthenticated && currentUser?.id === owner;
  const canClaim = isAuthenticated && owner === "" && !isOwner;

  // Show PIN gate if group is private and not yet verified
  const showPinGate = isPrivate && !verified && groupData.data !== undefined;

  return (
    <>
      {groupData.data && (
        <Metadata
          seoTitle={`${groupData.data?.expand.groupInfo.name} -- SPLT`}
          seoDescription={`${groupData.data?.expand.groupInfo.avatar.emoji} ${groupData.data?.expand.groupInfo.description}`}
        />
      )}
      {showPinGate && (
        <PinGateModal groupId={groupId} onVerified={() => setVerified(true)} />
      )}
      <Container size="xs" mt="md">
        <Group justify="space-between">
          <SPLTIconSmall />
          <ToggleDarkLightMode />
        </Group>
        {canClaim && (
          <Alert
            mt="sm"
            icon={<IconShield size={16} />}
            title="Unclaimed group"
            color="blue"
            variant="light"
          >
            <Group gap="xs" align="center">
              <span>
                This group has no owner. Claim it to enable privacy settings.
              </span>
              <Button
                size="xs"
                loading={claimGroup.isPending}
                onClick={() => claimGroup.mutate(groupId)}
              >
                Claim Group
              </Button>
            </Group>
          </Alert>
        )}
        <Stack mb={100}>
          <Center>
            <TopSummary selectedTab={selectedTab} groupData={groupData} />
          </Center>
          <Center>
            <Tab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
          </Center>
          {selectedTab === TabType.Overview && <TabOverview />}
          {selectedTab === TabType.Transactions && (
            <TabTransactions groupData={groupData} />
          )}
        </Stack>
        <MadeWithLove />
      </Container>
    </>
  );
};

export default GroupPage;
