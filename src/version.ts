import fetch from 'node-fetch'
import {Tool} from './const'

export interface Release {
  tag_name: string
}

export function getArch(arch: string): string {
  switch (arch) {
    case '386':
      return '386'
    case 'x64':
      return 'amd64'
    case 'arm64':
      return 'arm64'
    default:
      throw new Error(`${arch} is not supported`)
  }
}

export function getOS(platform: string): string {
  switch (platform) {
    case 'linux':
      return 'linux'
    case 'darwin':
      return 'darwin'
    case 'win32':
      return 'windows'
    default:
      throw new Error(`${platform} is not supported`)
  }
}

export async function getLatestVersion(): Promise<string> {
  const url = `https://api.github.com/repos/${Tool.Org}/${Tool.Repo}/releases/latest`
  const response = await fetch(url)
  const json = (await response.json()) as Release
  return json.tag_name
}

export function getVersionBaseURL(version: string): string {
  if (version === 'latest') {
    return `https://github.com/${Tool.Org}/${Tool.Repo}/releases/latest/download/`
  } else {
    return `https://github.com/${Tool.Org}/${Tool.Repo}/releases/download/${version}/`
  }
}

export function getDownloadURL(
  os: string,
  arch: string,
  version: string
): string {
  const ext = (os: string): string => {
    if (os === 'windows') {
      return '.exe'
    } else {
      return ''
    }
  }

  const versionBaseURL = getVersionBaseURL(version)
  return `${versionBaseURL}/allurectl_${os}_${arch}${ext(os)}`
}
