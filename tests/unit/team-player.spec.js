import { mount } from '@vue/test-utils';
import TeamPlayer from '@/components/team-player.vue';

describe('TeamPlayer.vue', () => {
  let wrapper;

  afterEach(() => {
    if (wrapper) {
      wrapper.destroy();
    }
  });

  it('renders correctly', () => {
    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    expect(wrapper.exists()).toBe(true);
  });

  it('displays loading state when loading is true', async () => {
    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: true, players: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.loading-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('Loading team players...');
  });

  it('displays empty state when no players are found', async () => {
    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: false, players: [] });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.empty-state').exists()).toBe(true);
    expect(wrapper.text()).toContain('No players found');
  });

  it('displays players when data is loaded', async () => {
    const mockPlayers = [
      {
        account_id: 1,
        name: 'Player One',
        games_played: 100,
        wins: 60,
        is_current_team_member: true
      },
      {
        account_id: 2,
        name: 'Player Two',
        games_played: 50,
        wins: 25,
        is_current_team_member: false
      }
    ];

    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: false, players: mockPlayers });
    await wrapper.vm.$nextTick();

    const playerCards = wrapper.findAll('.player-card');
    expect(playerCards.length).toBe(2);
  });

  it('calculates win rate correctly', () => {
    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });

    expect(wrapper.vm.calculateWinRate(60, 100)).toBe(60);
    expect(wrapper.vm.calculateWinRate(0, 100)).toBe(0);
    expect(wrapper.vm.calculateWinRate(100, 100)).toBe(100);
    expect(wrapper.vm.calculateWinRate(10, 0)).toBe(0);
  });

  it('displays active status badge for current team members', async () => {
    const mockPlayers = [
      {
        account_id: 1,
        name: 'Active Player',
        games_played: 100,
        wins: 60,
        is_current_team_member: true
      }
    ];

    wrapper = mount(TeamPlayer, {
      mocks: {
        $route: {
          params: { id: '123' }
        }
      }
    });
    wrapper.setData({ loading: false, players: mockPlayers });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain('Active Member');
  });
});