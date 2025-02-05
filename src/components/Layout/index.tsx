import styled from 'styled-components'
import React, {useEffect, useState} from 'react'
import LayoutStore from './Layout.store'
import {observer} from 'mobx-react-lite'
import MainPage from '../MainPage'
import Rules from '../Rules'
import Settings from '../Settings'
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`

const BackgroundImage = styled.div`
  z-index: -1;
  background-image: url('https://cdn.discordapp.com/attachments/800081672813019196/938170343552581735/unknown.png');
  background-size: cover;
  opacity: 0.1;
  width: 100vw;
  height: 100vh;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`

const MainContent = styled.div`
  flex: 1;
`

const Version = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  color: #ddd;
  padding: 4px;
`

const OnlineStatus = styled.div`
  position: absolute;
  top: 40px;
  right: 10px;
  color: #ddd;
  padding: 4px;
  font-size: 16px;
`

const UpdateStatus = styled.div`
  position: absolute;
  top: 70px;
  right: 10px;
  color: #ddd;
  padding: 4px;
  font-size: 16px;
`

const PlayButton = styled.button`
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  cursor: pointer;
  width: 200px;
  font-size: 24px;
  background-color: #0c618f; /* Green */
  border: none;
  color: #ddd;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s ease-in-out;

  &:disabled {
    background: #0c364c;
    color: #7e7e7e;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #073148; /* Green */
    color: white;
  }
`

const BottomRow = styled.div`
  height: 70px;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
`
const Spacer = styled.div`
  flex: 1;
`

const LogFile = styled.div`
  color: #ddd;
  padding: 4px;
  cursor: pointer;
`

const DiscordLink = styled.a`
  text-decoration: none;
  color: #ddd;
  font-size: 24px;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 10px;
  border-radius: 10px;
  transition: 0.3s ease-in-out;
  background-color: rgba(0, 0, 0, 0.1);

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const FolderIcon = styled.div`
  background-image: url('https://icons-for-free.com/iconfiles/png/512/folder-131964753094019398.png');
  background-size: contain;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  cursor: pointer;
`

const SettingsButton = styled.div`
  background-image: url('https://icons.iconarchive.com/icons/grafikartes/flat-retro-modern/256/settings-icon.png');
  background-size: contain;
  width: 40px;
  height: 40px;
  margin-right: 20px;
  cursor: pointer;
`

const DiscordLogo = styled.img`
  width: 50px;
  height: 50px;
`

const Layout = () => {
  const [settings, setSettings] = useState(false);

  useEffect(() => {
    LayoutStore.init();
  }, [])

  return (
    <Container>
      <NotificationContainer/>
      <BackgroundImage />
      <Version>{LayoutStore.version}</Version>
      <OnlineStatus>
        Онлайн: {LayoutStore.onlineCount}/{LayoutStore.maxOnlineCount}
      </OnlineStatus>
      <UpdateStatus onClick={() => LayoutStore.onUpdateButton()}>
        {LayoutStore.getUpdateStatus()}
      </UpdateStatus>
      <MainContent>
        <DiscordLink
          onClick={() => {
            window.Main.sendMessage({
              type: 'open-discord',
              url: 'https://discord.gg/3DmvqWHGqU',
            })
          }}
        >
          <DiscordLogo
            src="https://www.svgrepo.com/show/353655/discord-icon.svg"
            alt=""
          />
          Discord
        </DiscordLink>
        {LayoutStore.rulesAccepted ? (settings ? <Settings close={() => setSettings(false)} /> : <MainPage />) : <Rules />}
      </MainContent>
      {LayoutStore.rulesAccepted && (
        <BottomRow>
          <LogFile
            onClick={() => window.Main.sendMessage({ type: 'open-log' })}
          >
            Лог
          </LogFile>
          <PlayButton
            disabled={!LayoutStore.updateStatus.updated || !LayoutStore.token}
            onClick={() => LayoutStore.launchGame()}
          >
            Играть
          </PlayButton>
          <Spacer />

          <FolderIcon onClick={() => window.Main.sendMessage({ type: 'open_directory' })} />
          <SettingsButton onClick={() => setSettings(!settings)} />
        </BottomRow>
      )}
    </Container>
  )
}

export default observer(Layout)
